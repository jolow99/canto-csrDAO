// // // SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";

// import "src/csrDAOGovernor.sol";
// import "src/csrDAOToken.sol";
// import "src/csrDAOTreasury.sol";

// // RPC URL: canto-testnet.plexnode.wtf
// // Account: 0x0c1514024c4A847907FbdB8eA0Dd95a4eeAe9237
// // Chain ID: 7701

// contract TestContract is Test {
//     csrDAOToken token;
//     csrDAOTreasury treasury;
//     csrDAOGovernor governor;

//     function setUp() public {
//         // Deploy the token 
//         token = new csrDAOToken();
//         // Deploy the treasury and pass in the msg.sender as the first parameter and the token as the second parameter
//         treasury = new csrDAOTreasury(msg.sender, address(token));
//         // Deploy the governor and pass in the token as the first parameter, timelock as the second, and treasury as the third
//         governor = new csrDAOGovernor(token);

//         // Set owner of the token to the treasury
//         token.transferOwnership(address(treasury));
//     }

//     function testTrueIsTrue() public {
//         assertTrue(true);
//     }
// }