import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { getFactoryContract } from '../utils/contract';
import { ethers } from 'ethers';
import { Rocket, Loader2 } from 'lucide-react';

const CreateCampaign = () => {
    const { signer } = useWallet();
    const navigate = useNavigate();
    const [goal, setGoal] = useState('');
    const [duration, setDuration] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleCreate = async (e) => {
        e.preventDefault();
        if(!signer) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            setLoading(true);
            const factory = await getFactoryContract(signer);
            const tx = await factory.createCampaign(ethers.parseEther(goal), duration);
            await tx.wait();
            alert("Campaign created successfully!");
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Failed to create campaign: " + (error.reason || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 flex justify-center">
            <div className="glass-panel p-8 w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Rocket className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Launch Your Idea</h2>
                    <p className="text-slate-400">Set a goal and deadline to start raising funds.</p>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Funding Goal (ETH)</label>
                        <input 
                            type="number" 
                            step="0.01"
                            required
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="e.g. 5.0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Duration (Days)</label>
                        <input 
                            type="number" 
                            min="1"
                            required
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="e.g. 30"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full btn-primary bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <Rocket className="w-5 h-5" />}
                        Create Campaign
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
