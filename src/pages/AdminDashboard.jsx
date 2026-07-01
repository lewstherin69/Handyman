import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Package
} from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const [reqRes, statsRes] = await Promise.all([
        fetch('/api/admin/requests', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (reqRes.status === 403 || statsRes.status === 403) {
        handleLogout();
        return;
      }

      const reqData = await reqRes.json();
      const statsData = await statsRes.json();
      
      setRequests(reqData);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`/api/admin/requests/${selectedRequest.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedRequest)
      });

      if (response.ok) {
        await fetchData();
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error('Error updating request:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredRequests = activeTab === 'All' 
    ? requests 
    : requests.filter(r => r.status === activeTab);

  if (loading && !requests.length) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Settings className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-xs">Admin Panel</span>
          </div>
          <h2 className="text-xl font-bold text-white">SIR Fix-A-Lot</h2>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500 text-slate-900 font-bold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <ClipboardList className="w-5 h-5" /> Service Requests
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Users className="w-5 h-5" /> Customers
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {localStorage.getItem('adminUser')}</h1>
            <p className="text-slate-400">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">+12%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Requests</p>
              <h3 className="text-3xl font-bold text-white">{stats.totalRequests}</h3>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">+5%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Lead Conversion</p>
              <h3 className="text-3xl font-bold text-white">{stats.conversionRate}</h3>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">+24%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Monthly Revenue</p>
              <h3 className="text-3xl font-bold text-white">{stats.monthlyRevenue}</h3>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">Avg Response</p>
              <h3 className="text-3xl font-bold text-white">{stats.avgResponseTime}</h3>
            </div>
          </div>
        )}

        {/* Request Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white">Recent Requests</h2>
              <div className="flex bg-slate-800 p-1 rounded-xl">
                {['All', 'Pending', 'Scheduled', 'In Progress', 'Completed'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search ticket or customer..."
                className="bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-sm uppercase tracking-wider border-b border-slate-800/50">
                  <th className="px-6 py-4 font-bold">Ticket</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Service</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Payment</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-amber-500 text-sm">{req.ticket_id}</td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{req.name}</div>
                      <div className="text-slate-500 text-xs">{req.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{req.category}</div>
                      <div className="text-slate-500 text-xs truncate max-w-[200px]">{req.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        req.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        req.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        req.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                        req.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-bold text-sm">${(req.total_price || 0).toFixed(2)}</div>
                      <div className={`text-[10px] font-bold uppercase ${req.payment_status === 'Fully Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {req.payment_status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl shadow-black animate-in">
            <form onSubmit={handleUpdateRequest}>
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Edit Request <span className="text-amber-500 font-mono text-xl">{selectedRequest.ticket_id}</span>
                  </h2>
                  <p className="text-slate-400 text-sm">Update service details, schedule, and pricing.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-slate-700 rounded-full text-slate-400"
                >
                  <MoreVertical className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side: Basic Info & Status */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Request Status</label>
                    <select 
                      value={selectedRequest.status}
                      onChange={(e) => setSelectedRequest({...selectedRequest, status: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option>Pending</option>
                      <option>Scheduled</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Scheduled Date</label>
                      <input 
                        type="date"
                        value={selectedRequest.scheduled_date || ''}
                        onChange={(e) => setSelectedRequest({...selectedRequest, scheduled_date: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Scheduled Time</label>
                      <input 
                        type="text"
                        placeholder="e.g. 09:00 AM"
                        value={selectedRequest.scheduled_time || ''}
                        onChange={(e) => setSelectedRequest({...selectedRequest, scheduled_time: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Internal Technician Notes
                    </label>
                    <textarea 
                      rows="4"
                      value={selectedRequest.admin_notes || ''}
                      onChange={(e) => setSelectedRequest({...selectedRequest, admin_notes: e.target.value})}
                      placeholder="Visible to customer in tracking portal..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm"
                    ></textarea>
                  </div>
                </div>

                {/* Right Side: Pricing & Materials */}
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-amber-500" /> Quotation Builder
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Labor (Hours)</label>
                        <input 
                          type="number" step="0.5"
                          value={selectedRequest.estimate_hours || 0}
                          onChange={(e) => setSelectedRequest({...selectedRequest, estimate_hours: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Rate ($/hr)</label>
                        <input 
                          type="number"
                          value={selectedRequest.hourly_rate || 75}
                          onChange={(e) => setSelectedRequest({...selectedRequest, hourly_rate: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                          <Package className="w-3 h-3" /> Material Cost
                        </label>
                        <input 
                          type="number" step="0.01"
                          value={selectedRequest.material_cost || 0}
                          onChange={(e) => setSelectedRequest({...selectedRequest, material_cost: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Markup %</label>
                        <input 
                          type="number"
                          value={selectedRequest.material_markup || 15}
                          onChange={(e) => setSelectedRequest({...selectedRequest, material_markup: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Payment Link (Square Checkout)</label>
                      <input 
                        type="url"
                        placeholder="https://checkout.square.site/..."
                        value={selectedRequest.payment_link || ''}
                        onChange={(e) => setSelectedRequest({...selectedRequest, payment_link: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white text-xs mb-3"
                      />
                      <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Payment Status</label>
                      <select 
                        value={selectedRequest.payment_status}
                        onChange={(e) => setSelectedRequest({...selectedRequest, payment_status: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
                      >
                        <option>Unpaid</option>
                        <option>Deposit Paid</option>
                        <option>Fully Paid</option>
                        <option>Refunded</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-800/30 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={isUpdating}
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-10 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
