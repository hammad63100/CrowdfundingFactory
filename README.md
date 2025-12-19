# Decentralized Crowdfunding DApp

A modern, multi-page decentralized application (DApp) for creating and managing crowdfunding campaigns on the Ethereum blockchain. Built with React, Solidity, and Hardhat.

## 🚀 Features

*   **Factory Pattern Architecture**: A central `CrowdfundingFactory` contract creates and tracks multiple individual campaign contracts.
*   **Dynamic Campaign Creation**: Users can launch their own fundraising campaigns with specific goals and deadlines.
*   **Role-Based Interactions**:
    *   **Creators/Owners**: Can withdraw funds if the goal is met after the deadline.
    *   **Contributors**: Can pledge ETH and claim refunds if the campaign fails.
*   **Global Wallet Management**: Seamless wallet connection using `WalletContext` and MetaMask.
*   **Dashboard**: View your created campaigns and track contributions.
*   **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a premium, responsive experience.

## 🛠 Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Ethers.js v6
*   **Smart Contracts**: Solidity ^0.8.20
*   **Development Environment**: Hardhat (with Ethers v5 compatibility layer for deployment script)
*   **Network**: Localhost (Hardhat Network)

## 📋 Prerequisites

*   [Node.js](https://nodejs.org/) (v16+)
*   [MetaMask](https://metamask.io/) browser extension

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd "Simple Crowdfunding Smart Contract project"
    ```

2.  **Install dependencies:**

    *   **Root (Hardhat + Contracts):**
        ```bash
        npm install
        ```
    *   **Frontend:**
        ```bash
        cd frontend
        npm install
        ```

3.  **Start the Local Blockchain Node:**
    From the root directory, start the Hardhat node:
    ```bash
    npx hardhat node
    ```
    *Keep this terminal running.*

4.  **Deploy Smart Contracts:**
    Open a new terminal in the root directory and run:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```
    Make a note of the deployed **Factory Address** from the output.

5.  **Configure Frontend:**
    1.  Open `frontend/src/utils/contract.js`.
    2.  Update `CONTRACT_ADDRESSES.Factory` with the address from the previous step.
        ```javascript
        export const CONTRACT_ADDRESSES = {
            Factory: "0x..." // Your deployed address
        };
        ```

6.  **Run the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🦊 Connecting MetaMask to Localhost

1.  Open MetaMask -> Settings -> Networks -> Add Network -> Add a network manually.
2.  **Network Name**: Localhost 8545
3.  **RPC URL**: `http://127.0.0.1:8545`
4.  **Chain ID**: `1337` (or `31337` if `1337` fails)
5.  **Currency Symbol**: ETH
6.  **Import Account**: Use one of the private keys displayed in your `npx hardhat node` terminal (e.g., Account #0) to have test ETH.

## 📖 Usage Guide

*   **Create a Campaign**: Navigate to "Create Campaign", enter a funding goal (in ETH) and duration (in days). Confirm the transaction in MetaMask.
*   **Contribute**: Click "View Details" on any campaign. Enter an amount and click "Contribute".
*   **Withdraw Funds**: If you are the owner and the *Goal is Reached* + *Deadline Passed*, a "Withdraw" button will appear in the Admin Panel.
*   **Refund**: If you contributed and the *Goal is NOT Reached* + *Deadline Passed*, a "Refund" button will appear.

## 📂 Project Structure

```
├── contracts/               # Solidity Smart Contracts
│   ├── CrowdfundingFactory.sol
│   └── SimpleCrowdfunding.sol
├── frontend/                # React Frontend Application
│   ├── src/
│   │   ├── components/      # Reusable UI components (Navbar, Cards)
│   │   ├── context/         # Global state (WalletContext)
│   │   ├── pages/           # Application pages (Home, Create, Details)
│   │   ├── utils/           # Contract ABIs and helpers
│   │   └── App.jsx
│   └── tailwind.config.js
├── scripts/                 # Deployment scripts
├── hardhat.config.js        # Hardhat configuration
└── README.md                # Project documentation
```

## ⚠️ Troubleshooting

*   **"Nonce too high"**: If you restart the hardhat node, reset your MetaMask account activity (Settings -> Advanced -> Clear activity tab data).
*   **"Invalid ENS name"**: Ensure `contract.js` has the correct Factory address string.
