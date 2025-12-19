import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { formatEth } from '../utils/contract';
import { ethers } from 'ethers';
import { PlusCircle } from 'lucide-react';

const Home = () => {
  const { provider } = useWallet();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
        // Just mocking for now if no provider, or we use a read-only provider
        //Ideally we use a JsonRpcProvider if wallet not connected
        if(!provider && !window.ethereum) {
            setLoading(false);
            return; 
        }

        try {
            // For real fetching, we would need the Factory Contract address in utils/contract.js
            // And we would call getCampaigns()
            // Here I will assume we have a getFactoryContract function
            // const factory = await getFactoryContract(provider || new ethers.BrowserProvider(window.ethereum));
            // const addresses = await factory.getCampaigns();
            
            // MOCK DATA for now until Factory is deployed
            // In real app, replace with fetching
             const mockCampaigns = [
               { address: "0xMock1", goal: ethers.parseEther("10"), totalRaised: ethers.parseEther("2"), deadline: Date.now()/1000 + 86400 * 5 },
               { address: "0xMock2", goal: ethers.parseEther("5"), totalRaised: ethers.parseEther("5"), deadline: Date.now()/1000 - 100 },
             ];
             // In real implementation:
             // Loop through addresses, create contract instance for each, fetch basic info (goal, raised, etc)
             // or better, create a struct in Factory to return all info in one call to save requests.
             
             setCampaigns(mockCampaigns);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchCampaigns();
  }, [provider]);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white">Explore Campaigns</h1>
           <p className="text-slate-400">Discover and support decentralized projects.</p>
        </div>
        <Link to="/create" className="btn-primary flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Start a Campaign
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
              <p className="text-slate-400">Loading campaigns...</p>
          ) : campaigns.length > 0 ? (
              campaigns.map((camp, idx) => (
                  <Link to={`/campaign/${camp.address}`} key={idx} className="glass-panel p-5 hover:bg-white/10 transition-colors group">
                      <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                              #{idx+1}
                          </div>
                           <span className={`px-2 py-1 rounded-full text-xs font-bold ${camp.totalRaised >= camp.goal ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {camp.totalRaised >= camp.goal ? 'Success' : 'Active'}
                           </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 truncate">Campaign {camp.address.slice(0,6)}...</h3>
                      <div className="space-y-2 text-sm text-slate-400">
                          <div className="flex justify-between">
                              <span>Goal</span>
                              <span className="text-white">{formatEth(camp.goal)} ETH</span>
                          </div>
                           <div className="flex justify-between">
                              <span>Raised</span>
                              <span className="text-white">{formatEth(camp.totalRaised)} ETH</span>
                          </div>
                      </div>
                  </Link>
              ))
          ) : (
            <div className="col-span-3 text-center py-20">
                <p className="text-slate-500 mb-4">No campaigns found.</p>
                <Link to="/create" className="text-blue-400 hover:text-blue-300">Be the first to create one!</Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Home;
