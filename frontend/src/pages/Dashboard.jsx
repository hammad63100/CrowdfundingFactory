import React from 'react';
import { useWallet } from '../context/WalletContext';

const Dashboard = () => {
    const { account } = useWallet();

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-white mb-8">My Dashboard</h1>

            {!account ? (
                <p className="text-slate-400">Please connect your wallet to view your dashboard.</p>
            ) : (
                <div className="space-y-12">
                     <section>
                        <h2 className="text-xl font-semibold text-blue-400 mb-4">My Campaigns</h2>
                        <div className="glass-panel p-6 text-center text-slate-400">
                            <p>You haven't created any campaigns yet.</p>
                            {/* Logic to filter campaigns where owner === account */}
                        </div>
                     </section>

                     <section>
                        <h2 className="text-xl font-semibold text-purple-400 mb-4">My Contributions</h2>
                        <div className="glass-panel p-6 text-center text-slate-400">
                            <p>You haven't made any contributions yet.</p>
                             {/* Logic to query contributions (requires event indexing or graph) */}
                        </div>
                     </section>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
