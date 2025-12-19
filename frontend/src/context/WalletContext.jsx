import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';

const WalletContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signerInstance = await browserProvider.getSigner();
        
        setProvider(browserProvider);
        setSigner(signerInstance);
        setAccount(accounts[0]);
        return true;
      } catch (error) {
        console.error("Connection failed", error);
        return false;
      }
    } else {
      alert("Please install MetaMask!");
      return false;
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          // Refresh signer
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          browserProvider.getSigner().then(setSigner);
        } else {
          setAccount(null);
          setSigner(null);
        }
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ account, provider, signer, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
