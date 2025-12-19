import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { getContract } from '../utils/contract';
import CampaignCard from '../components/CampaignCard';
import ContributeForm from '../components/ContributeForm';
import AdminPanel from '../components/AdminPanel';


const CampaignDetails = () => {
    const { address } = useParams();
    const { account, provider, signer } = useWallet();
    const [contract, setContract] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async (contractInstance) => {
        if (!contractInstance) return;
        try {
            const [owner, goal, deadline, totalRaised, goalReached, fundsWithdrawn] = await Promise.all([
                contractInstance.owner(),
                contractInstance.goal(),
                contractInstance.deadline(),
                contractInstance.totalRaised(),
                contractInstance.goalReached(),
                contractInstance.fundsWithdrawn()
            ]);

            setData({
                owner,
                goal,
                deadline,
                totalRaised,
                goalReached,
                fundsWithdrawn
            });
        } catch (error) {
            console.error("Error fetching campaign data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            if(!address || !provider) return;
            
            try {
                // If signer is available, use it (read/write), else use provider (read-only)
                const instance = await getContract(address, signer || provider);
                setContract(instance);
                fetchData(instance);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        init();
    }, [address, provider, signer, fetchData]);

    if (loading) return <div className="text-center py-20 text-white">Loading campaign details...</div>;
    if (!data) return <div className="text-center py-20 text-white">Campaign not found.</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        Campaign Details
                    </h1>
                    <p className="text-slate-400 font-mono text-sm">{address}</p>
                </div>

                <CampaignCard 
                    goal={data.goal}
                    raised={data.totalRaised}
                    deadline={data.deadline}
                    goalReached={data.goalReached}
                />

                {account ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        <ContributeForm contract={contract} refreshData={() => fetchData(contract)} />
                        <AdminPanel 
                            contract={contract}
                            account={account}
                            owner={data.owner}
                            goalReached={data.goalReached}
                            fundsWithdrawn={data.fundsWithdrawn}
                            deadline={data.deadline}
                            refreshData={() => fetchData(contract)}
                        />
                    </div>
                ) : (
                    <div className="text-center p-6 glass-panel">
                        <p className="text-slate-300">Connect your wallet to contribute or manage this campaign.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignDetails;
