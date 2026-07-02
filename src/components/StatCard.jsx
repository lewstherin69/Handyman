import React from 'react';

export default function StatCard({ icon: Icon, label, value, trend, iconBg = 'bg-amber-500/10', iconColor = 'text-amber-500' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${iconBg} ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}