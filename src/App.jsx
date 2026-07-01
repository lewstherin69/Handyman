import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Hammer, ClipboardList, Search, Lock, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import SubmitRequest from './pages/SubmitRequest';
import TrackRequest from './pages/TrackRequest';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        {/* Navigation */}
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-amber-500 p-2 rounded-lg group-hover:bg-amber-400 transition-colors">
                  <Hammer className="w-6 h-6 text-slate-900" />
                </div>
                <span className="text-xl font-bold tracking-tight">SIR Fix-A-Lot</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/submit" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <ClipboardList className="w-4 h-4" />
                  <span>Request Service</span>
                </Link>
                <Link to="/track" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <Search className="w-4 h-4" />
                  <span>Track Request</span>
                </Link>
                <Link to="/admin" className="flex items-center gap-2 hover:text-amber-400 transition-colors opacity-60 hover:opacity-100">
                  <Lock className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-md hover:bg-slate-700 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 pt-2 pb-6 flex flex-col gap-4 shadow-xl">
              <Link 
                to="/submit" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <ClipboardList className="text-amber-400" />
                <span>Request Service</span>
              </Link>
              <Link 
                to="/track" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="text-amber-400" />
                <span>Track Request</span>
              </Link>
              <Link 
                to="/admin" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 opacity-60"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock className="text-slate-400" />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitRequest />} />
            <Route path="/track" element={<TrackRequest />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 border-t border-slate-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-500" />
              <span className="font-bold">SIR Fix-A-Lot Handyman Services</span>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; 2026 SIR Fix-A-Lot. Professional repairs, assemblies, and installations.
            </div>
            <div className="flex gap-6">
              <Link to="/admin" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Admin Portal</Link>
              <span className="text-slate-500 text-sm">Privacy Policy</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
