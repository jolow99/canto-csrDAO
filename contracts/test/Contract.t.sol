// // SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/FundPGGovernor.sol";
import "src/FundPGToken.sol";
import "src/FundPGTreasury.sol";

contract TestContract is Test {
    FundPGToken token;
    FundPGTreasury treasury;
    FundPGGovernor governor;

    function setUp() public {
        // Deploy the token 
        token = new FundPGToken();
        // Deploy the treasury and pass in the msg.sender as the first parameter and the token as the second parameter
        treasury = new FundPGTreasury(msg.sender, address(token));
        // Deploy the governor and pass in the token as the first parameter, timelock as the second, and treasury as the third
        governor = new FundPGGovernor(token, payable(address(treasury)), address(treasury));

        // Set owner of the token to the treasury
        token.transferOwnership(address(treasury));
    }

    function testTrueIsTrue() public {
        assertTrue(true);
    }
}