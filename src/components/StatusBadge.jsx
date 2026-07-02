import React from 'react';

const statusStyles = {
  'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Scheduled': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'In Progress': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'Completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Cancelled': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

export default function StatusBadge({ status, size = 'sm' }) {
  const style = statusStyles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  const padding = size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs';

  return (
    <span className={`${padding} rounded-full font-bold border ${style} inline-block`}>
      {status}
    </span>
  );
}