import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, DollarSign, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

function TrackRequest() {
  const [searchParams] = useSearchParams();
  const [ticketId, setTicketId] = useState(searchParams.get('ticket') || '');
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(searchParams.get('success') === 'true');

  useEffect(() => {
    if (ticketId && searchParams.get('ticket')) {
      handleTrack(null, ticketId);
    }
  }, []);

  const handleTrack = async (e, id = ticketId) => {
    if (e) e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError('');
    setRequest(null);

    try {
      const response = await fetch(`/api/requests/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRequest(data);
      } else {
        setError('No request found with this tracking code. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'In Progress': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'Completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Cancelled': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="py-12 bg-slate-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4">Track Your Request</h1>
          <p className="text-slate-400">Enter your unique tracking code (e.g., SIR-XXXX) to see the latest status.</p>
        </div>

        {showSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-10 flex items-start gap-4">
            <CheckCircle2 className="text-emerald-500 shrink-0 w-6 h-6" />
            <div>
              <h3 className="text-emerald-500 font-bold text-lg">Request Submitted Successfully!</h3>
              <p className="text-slate-300">Your tracking code is <span className="font-mono font-bold text-white bg-slate-800 px-2 py-1 rounded">{ticketId}</span>. Please save this code to check your status later.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleTrack} className="flex gap-3 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value.toUpperCase())}
              placeholder="SIR-XXXX"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-mono text-lg tracking-widest"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 rounded-xl transition-all shadow-lg shadow-amber-500/10"
          >
            Track
          </button>
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
            <p className="text-slate-400">Fetching request details...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 flex flex-col items-center text-center">
            <AlertCircle className="text-rose-500 w-12 h-12 mb-4" />
            <p className="text-white font-medium text-lg">{error}</p>
          </div>
        )}

        {request && (
          <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/50">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Ticket ID</p>
                <h2 className="text-2xl font-mono font-bold text-white">{request.ticket_id}</h2>
              </div>
              <div className={`px-4 py-2 rounded-full border text-sm font-bold ${getStatusColor(request.status)}`}>
                {request.status}
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <p className="text-slate-500 text-sm mb-3 font-medium">Customer Details</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-slate-700 p-2 rounded-lg shrink-0"><MapPin className="w-4 h-4 text-slate-300" /></div>
                      <p className="text-slate-200">{request.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-slate-500 text-sm mb-3 font-medium">Service Information</p>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{request.category}</h3>
                    <p className="text-slate-400 leading-relaxed italic">"{request.description}"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-slate-500 text-sm mb-3 font-medium">Schedule</p>
                  <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700/50 space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span className="text-slate-300">
                        {request.scheduled_date ? new Date(request.scheduled_date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'To be scheduled'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-slate-300">{request.scheduled_time || 'Pending technician assignment'}</span>
                    </div>
                  </div>
                </div>

                {request.total_price > 0 && (
                  <div>
                    <p className="text-slate-500 text-sm mb-3 font-medium">Estimate & Payment</p>
                    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700/50">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400">Total Estimate:</span>
                        <span className="text-2xl font-bold text-white">${request.total_price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-6 text-sm">
                        <span className="text-slate-400">Payment Status:</span>
                        <span className={`font-bold ${request.payment_status === 'Fully Paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {request.payment_status}
                        </span>
                      </div>
                      
                      {request.payment_link && request.payment_status !== 'Fully Paid' && (
                        <a 
                          href={request.payment_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10"
                        >
                          Pay Online <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {request.admin_notes && (
              <div className="p-8 border-t border-slate-700 bg-slate-900/30">
                <p className="text-slate-500 text-sm mb-2 font-medium uppercase tracking-wider">Note from Technician</p>
                <p className="text-slate-300 leading-relaxed italic">{request.admin_notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackRequest;
