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

    error NotTheDonor();

    /// @dev only donor of _tokenId can call this function
    modifier onlyNftDonor(uint _tokenId) {
        if (donorOfTokenId[_tokenId] != msg.sender) revert NotTheDonor();
        _;
    }

    /// @notice Sets the initial recipient and the Canto turnstile address
    constructor(address _csrDAO) {
        turnstile = ITurnstile(address(0xEcf044C5B4b867CFda001101c617eCd347095B44));
        csrDAO = IVotingToken(_csrDAO);
    }

    /// @notice Withdraw funds from the treasury to the recipient
    function withdraw(address _recipient, uint _amount) external onlyOwner{
        payable(_recipient).transfer(_amount);
    }


    /// @notice Redeem the accrued CSR for the specified token ID to this contract 
    /// @notice Increments the donation amount for the donor of the NFT
    function redeemAccruedCsr(uint tokenId) external onlyNftDonor(tokenId) {
        uint accruedCsr = turnstile.balances(tokenId);
        donations[msg.sender] += accruedCsr;
        totalDonations += accruedCsr;
        turnstile.withdraw(tokenId, address(this), accruedCsr);
        csrDAO.mint(msg.sender, accruedCsr);
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

    /// @notice Receive native CANTO from either the Turnstile, or directly from EOAs
    /// @dev Supports donation methods C and 'others'
    receive() external payable {
        totalDonations += msg.value;
        if (msg.sender == address(turnstile)) {
            donations[tx.origin] += msg.value;
            csrDAO.mint(tx.origin, msg.value);
        } else {
            donations[msg.sender] += msg.value;
            csrDAO.mint(msg.sender, msg.value);
        }

    }
 }
