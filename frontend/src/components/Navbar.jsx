import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Wallet, LogOut, Plus, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 rounded-none h-20 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          CryptoFund
        </h1>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
                <HomeIcon className="w-4 h-4" />
                Explore
            </Link>
            <Link to="/create" className="hover:text-white flex items-center gap-1 transition-colors">
                <Plus className="w-4 h-4" />
                Start Campaign
            </Link>
        </div>

        {account ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5 items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-mono text-slate-300">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
            <button 
              onClick={disconnectWallet}
              className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Disconnect"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={connectWallet}
            className="btn-primary flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden md:inline">Connect Wallet</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
