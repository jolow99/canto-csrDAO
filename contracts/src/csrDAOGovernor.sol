// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/governance/Governor.sol";
import "openzeppelin-contracts/contracts/governance/extensions/GovernorCountingSimple.sol";
import "openzeppelin-contracts/contracts/governance/extensions/GovernorVotes.sol";
import "openzeppelin-contracts/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract csrDAOGovernor is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(IVotes _token)
        Governor("csrDAOGovernor")
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
    {}

    function votingDelay() public pure override returns (uint256) {
        return 1; // 1 block
    }

    function votingPeriod() public pure override returns (uint256) {
        return 50400; // 1 week
    }

    // The following functions are overrides required by Solidity.

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }
}