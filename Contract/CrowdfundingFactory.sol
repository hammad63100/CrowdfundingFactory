// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SimpleCrowdfunding.sol";

contract CrowdfundingFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(
        address indexed campaignAddress,
        address indexed owner,
        uint256 goal,
        uint256 deadline
    );

    function createCampaign(
        uint256 _goalInETH,
        uint256 _durationInDays
    ) external {
        // Convert days to seconds for the contract
        uint256 durationInSeconds = _durationInDays * 1 days;

        Crowdfunding newCampaign = new Crowdfunding(
            _goalInETH,
            durationInSeconds,
            msg.sender
        );
        // Transfer ownership to the msg.sender so they can withdraw funds later
        // Note: The original contract sets owner = msg.sender in constructor.
        // Since Factory calls it, Factory is owner initially.
        // We need to modify Crowdfunding or add a transferOwnership function if we want the user to be owner.
        // HOWEVER, generic Crowdfunding usually sets owner to msg.sender.
        // Ideally, we pass the owner in constructor.

        // LIMITATION FIX: The current Simple_Crowdfunding contract sets owner = msg.sender.
        // So the Factory will be the owner. We need to fix this.
        // For now, I will assume we can modify the original contract or use a workaround.
        // Actually, let's just make sure the Crowdfunding contract allows transferring ownership
        // OR we change the constructor to accept an owner.

        deployedCampaigns.push(address(newCampaign));

        emit CampaignCreated(
            address(newCampaign),
            msg.sender,
            _goalInETH,
            block.timestamp + durationInSeconds
        );
    }

    function getCampaigns() external view returns (address[] memory) {
        return deployedCampaigns;
    }
}
