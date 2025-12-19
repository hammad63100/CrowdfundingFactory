import React, { useState } from 'react';
import { Shield, RefreshCw, Download } from 'lucide-react';

const AdminPanel = ({ contract, account, owner, goalReached, fundsWithdrawn, deadline, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const isOwner = account && owner && account.toLowerCase() === owner.toLowerCase();
  const isEnded = Date.now() / 1000 > Number(deadline);

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      const tx = await contract.withdraw();
      await tx.wait();
      refreshData();
      alert("Funds withdrawn successfully!");
    } catch (error) {
      alert("Withdraw failed: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    try {
      setLoading(true);
      const tx = await contract.refund();
      await tx.wait();
      refreshData();
      alert("Refund claimed successfully!");
    } catch (error) {
      alert("Refund failed: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!contract) return null;

  return (
    <div className="glass-panel p-6 w-full max-w-md mx-auto mt-6 border-l-4 border-l-purple-500">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Actions</h3>
      </div>

      <div className="space-y-3">
        {isOwner && goalReached && isEnded && !fundsWithdrawn && (
          <button 
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full btn-primary bg-purple-600 hover:bg-purple-700 flex justify-center items-center gap-2"
          >
            {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
            Withdraw Funds
          </button>
        )}

        {isOwner && (!goalReached || !isEnded) && (
          <p className="text-sm text-slate-400 text-center">Owner actions available when goal reached and deadline passed.</p>
        )}

        {!goalReached && isEnded && (
          <button 
            onClick={handleRefund}
            disabled={loading}
            className="w-full btn-secondary bg-red-600/80 hover:bg-red-700 flex justify-center items-center gap-2"
          >
            {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
            Claim Refund
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
