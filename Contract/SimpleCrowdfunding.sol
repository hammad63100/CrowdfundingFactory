// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Crowdfunding {
    address public owner;
    uint256 public goal; // funding goal in wei
    uint256 public deadline; // timestamp
    uint256 public totalRaised;

    mapping(address => uint256) public contributions;

    bool public goalReached;
    bool public fundsWithdrawn;

    constructor(
        uint256 _goalInETH,
        uint256 _durationInSeconds,
        address _owner
    ) {
        owner = _owner;
        goal = _goalInETH * 1 ether;
        deadline = block.timestamp + _durationInSeconds;
    }

    // Send ETH to support the campaign
    function contribute() external payable {
        require(block.timestamp < deadline, "Campaign ended");
        require(msg.value > 0, "Send some ETH");

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        if (totalRaised >= goal) {
            goalReached = true;
        }
    }

    // Owner withdraws funds if goal is reached
    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        require(block.timestamp >= deadline, "Too early");
        require(goalReached, "Goal not reached");
        require(!fundsWithdrawn, "Already withdrawn");

        fundsWithdrawn = true;
        payable(owner).transfer(address(this).balance);
    }

    // Contributors claim refund if goal not reached
    function refund() external {
        require(block.timestamp >= deadline, "Too early");
        require(!goalReached, "Goal was reached");

        uint256 amount = contributions[msg.sender];
        require(amount > 0, "Nothing to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
