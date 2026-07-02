import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Hammer className="w-5 h-5 text-amber-500" />
          <span className="font-bold">SIR Fix-A-Lot Handyman Services</span>
        </div>
        <div className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} SIR Fix-A-Lot. Professional repairs, assemblies, and installations.
        </div>
        <div className="flex gap-6">
          <Link to="/admin" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Admin Portal</Link>
          <span className="text-slate-500 text-sm cursor-default">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}