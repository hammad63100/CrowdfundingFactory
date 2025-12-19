import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { formatEth } from '../utils/contract';

const CampaignCard = ({ goal, raised, deadline, goalReached }) => {
  const percentage = Math.min((Number(raised) / Number(goal)) * 100, 100);
  
  const calculateTimeLeft = useCallback(() => {
    return Math.max(0, Number(deadline) - Math.floor(Date.now() / 1000));
  }, [deadline]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  
  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);

  return (
    <div className="glass-panel p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Campaign Status
          </h2>
          <p className="text-slate-400 text-sm">Target vs Raised</p>
        </div>
        {goalReached ? (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/20">
            Goal Reached
          </span>
        ) : (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">
            Active
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Raised</span>
            <span className="text-white font-mono">{formatEth(raised)} ETH</span>
          </div>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-slate-500">
            <span>0 ETH</span>
            <span>Goal: {formatEth(goal)} ETH</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-1 text-blue-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold">Time Left</span>
            </div>
            <div className="text-lg font-mono text-white">
              {timeLeft > 0 ? `${days}d ${hours}h` : "Ended"}
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-1 text-purple-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold">Progress</span>
            </div>
            <div className="text-lg font-mono text-white">
              {percentage.toFixed(1)}%
            </div>
          </div>
        </div>

        {timeLeft === 0 && !goalReached && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <p>Campaign ended without reaching the goal.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
