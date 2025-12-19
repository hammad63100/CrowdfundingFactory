import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';

function App() {
  return (
    <WalletProvider>
        <Router>
            <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden font-sans">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>
                
                <Navbar />

                <main className="pt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateCampaign />} />
                        <Route path="/campaign/:address" element={<CampaignDetails />} />
                        {/* <Route path="/dashboard" element={<Dashboard />} /> */} 
                    </Routes>
                </main>
            </div>
        </Router>
    </WalletProvider>
  )
}

export default App
