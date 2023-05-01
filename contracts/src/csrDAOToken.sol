// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Votes.sol";

interface ITurnstile {
    function register(address) external returns(uint256);
}

contract csrDAOToken is ERC20, Ownable, ERC20Permit, ERC20Votes {
    constructor() ERC20("csrDAO", "csrDAO") ERC20Permit("csrDAO") {
        ITurnstile turnstile = ITurnstile(address(0xEcf044C5B4b867CFda001101c617eCd347095B44));
        turnstile.register(tx.origin);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @dev The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}