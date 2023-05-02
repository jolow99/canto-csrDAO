// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";

interface IVotingToken {
    function mint(address to, uint amount) external;
}

interface ITurnstile {
    function balances(uint tokenId) external view returns (uint);
    function transferFrom(address from, address to, uint tokenId) external;
    function withdraw(uint tokenId, address to, uint amount) external;
    function register(address) external returns(uint256);
}

contract csrDAOTreasury is Ownable, IERC721Receiver {
    /// @dev Canto turnstile contract
    ITurnstile public immutable turnstile;

    /// @dev csrDAO Voting Token
    IVotingToken public immutable csrDAO;

    /// @dev Total amount of donations
    uint public totalDonations;

    /// @dev Mapping from the donor address to the amount donated
    mapping(address => uint) public donations;

    /// @dev Mapping from the token ID to the donor address
    mapping(uint => address) public donorOfTokenId; 

    /// @dev Mapping from donor address to the token IDs donated
    mapping(address => uint[]) public donorTokenIds; 

    /// @dev Reverts when the donor of the tokenId is not the caller
    error NotTheDonor();

    event Donation(address indexed donor, uint amount);

    /// @dev only donor of _tokenId can call this function
    modifier onlyNftDonor(uint _tokenId) {
        if (donorOfTokenId[_tokenId] != msg.sender) revert NotTheDonor();
        _;
    }

    /// @notice Sets the initial recipient and the Canto turnstile address
    constructor(address _csrDAO) {
        turnstile = ITurnstile(address(0xEcf044C5B4b867CFda001101c617eCd347095B44));
        csrDAO = IVotingToken(_csrDAO);
        turnstile.register(tx.origin);
    }

    /// @notice returns the entire array of donorTokenIds
    /// @dev this is needed because the default getter generated by compiler only allows you to access the values in the array
    function getDonorTokenIds(address donor) external view returns (uint[] memory) {
        return donorTokenIds[donor];
    }

    /// @notice Withdraw funds from the treasury to the recipient
    /// @dev Should only be called by the governance contract
    function withdraw(address _recipient, uint _amount) external onlyOwner{
        payable(_recipient).transfer(_amount);
    }


    /// @notice Redeem the accrued CSR for the specified token ID to this contract 
    /// @notice Increments the donation amount for the donor of the NFT
    /// @dev The turnstile.withdraw triggers the fallback function which mints and updates states.
    function redeemAccruedCsr(uint tokenId) public onlyNftDonor(tokenId) {
        uint accruedCsr = turnstile.balances(tokenId);
        turnstile.withdraw(tokenId, address(this), accruedCsr);
    }

    /// @notice Stake the specified CSR NFT to this contract
    /// @dev The donor must have approved this contract to transfer the NFT
    /// @dev Does not use safeTransferFrom
    /// @dev Supports donation method B
    function stakeCsrNft(uint tokenId) external {
        donorOfTokenId[tokenId] = msg.sender;
        donorTokenIds[msg.sender].push(tokenId);
        turnstile.transferFrom(msg.sender, address(this), tokenId);
    }

    /// @notice Withdraw the specified CSR NFT from this contract
    /// @notice If the donor delegated upon stake, only the delegate can withdraw the NFT
    /// @dev Does not use safeTransferFrom
    /// @dev Removes the tokenId from the donorTokenIds array
    function withdrawCsrNft(uint tokenId, address withdrawTo) external onlyNftDonor(tokenId) {
        // Remove tokenId from the array of tokenIds in donorTokenIds
        uint[] storage tokenIds = donorTokenIds[msg.sender];
        for (uint i = 0; i < tokenIds.length; i++) {
            if (tokenIds[i] == tokenId) {
                tokenIds[i] = tokenIds[tokenIds.length - 1];
                tokenIds.pop();
                break;
            }
        }
        redeemAccruedCsr(tokenId);
        turnstile.transferFrom(address(this), withdrawTo, tokenId);
    }

    /// @notice Receive the NFT from the Canto turnstile contract
    /// @dev This function is called by the Canto turnstile contract when a token is safeTransferred to this contract
    /// @dev Supports donation method A
    function onERC721Received(address, address _from, uint256 _tokenId, bytes calldata) external returns (bytes4) {
        require(msg.sender == address(0xEcf044C5B4b867CFda001101c617eCd347095B44), "Not the turnstile contract");
        donorOfTokenId[_tokenId] = _from;
        donorTokenIds[_from].push(_tokenId);
        return IERC721Receiver.onERC721Received.selector;
    }

    /// @notice Receives native CANTO from the Turnstile contract 
    /// @dev Turnstile uses Address.sendValue with a calldata of "" to send native CANTO
    /// @dev If you donate from a smart contract, the donations are tagged to the EOA.
    fallback() external payable {
        totalDonations += msg.value;
        donations[tx.origin] += msg.value;
        csrDAO.mint(tx.origin, msg.value);
        emit Donation(tx.origin, msg.value);
    }

    /// @notice Receive native CANTO directly 
    /// @dev Supports donation methods C and 'others'
    /// @dev If you donate from a smart contract, the donations are tagged to the EOA.
    receive() external payable {
        totalDonations += msg.value;
        donations[tx.origin] += msg.value;
        csrDAO.mint(tx.origin, msg.value);
        emit Donation(tx.origin, msg.value);

    }
 }

