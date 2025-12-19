import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { parseEth } from '../utils/contract';

const ContributeForm = ({ contract, refreshData }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!amount || !contract) return;

    try {
      setLoading(true);
      const tx = await contract.contribute({ value: parseEth(amount) });
      await tx.wait();
      setAmount('');
      refreshData();
      alert("Contribution successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleContribute} className="glass-panel p-6 w-full max-w-md mx-auto mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">Make a Contribution</h3>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in ETH"
            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            disabled={loading}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">ETH</span>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !amount}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Contribute
        </button>
      </div>
    </form>
  );
};

export default ContributeForm;
