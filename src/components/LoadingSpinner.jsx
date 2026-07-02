import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 12, text = 'Loading...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <Loader2 className={`w-${size} h-${size} text-amber-500 animate-spin mb-4`} />
      {text && <p className="text-slate-400">{text}</p>}
    </div>
  );
}