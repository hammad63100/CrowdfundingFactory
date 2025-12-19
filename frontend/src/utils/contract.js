import { ethers } from 'ethers';

// Contracts Addresses - UPDATE THESE AFTER DEPLOYMENT
export const CONTRACT_ADDRESSES = {
    Factory: "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Localhost Address
};

export const CROWDFUNDING_ABI = [
  "function owner() view returns (address)",
  "function goal() view returns (uint256)",
  "function deadline() view returns (uint256)",
  "function totalRaised() view returns (uint256)",
  "function goalReached() view returns (bool)",
  "function fundsWithdrawn() view returns (bool)",
  "function contributions(address) view returns (uint256)",
  "function contribute() payable",
  "function withdraw()",
  "function refund()"
];

export const FACTORY_ABI = [
    "function createCampaign(uint256 _goalInETH, uint256 _durationInDays) external",
    "function getCampaigns() external view returns (address[])",
    "function deployedCampaigns(uint256) view returns (address)",
    "event CampaignCreated(address indexed campaignAddress, address indexed owner, uint256 goal, uint256 deadline)"
];

// Helper to get Crowdfunding contract instance
export const getContract = async (address, signerOrProvider) => {
  return new ethers.Contract(address, CROWDFUNDING_ABI, signerOrProvider);
};

// Helper to get Factory instance
export const getFactoryContract = async (signerOrProvider) => {
    return new ethers.Contract(CONTRACT_ADDRESSES.Factory, FACTORY_ABI, signerOrProvider);
};

// Reuse previous exports for compatibility just in case
export const getCrowdfundingContract = getContract; 

export const formatEth = (wei) => {
  return ethers.formatEther(wei);
};

export const parseEth = (eth) => {
  return ethers.parseEther(eth);
};
