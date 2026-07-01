import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Wrench, Settings, ShieldCheck, Clock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

function Home() {
  const services = [
    { name: 'Plumbing Repairs', icon: Wrench, desc: 'Dripping faucets, toilet leaks, and pipe fixes.' },
    { name: 'Electrical Work', icon: Zap, desc: 'Outlet replacements, light fixtures, and smart switches.' },
    { name: 'Assembly & Mounting', icon: Settings, desc: 'IKEA furniture assembly, TV wall mounting, and shelves.' },
    { name: 'Home Maintenance', icon: Hammer, desc: 'Drywall patching, painting, and general repairs.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Your Local <span className="text-amber-500 underline decoration-amber-500/30">Fix-It</span> Experts.
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Fast, professional, and reliable handyman services for your home or property. From leaky faucets to complex assemblies, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/submit" 
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                Book a Service <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/track" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg border border-slate-700 transition-all"
              >
                Track My Ticket
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent -skew-x-12 transform translate-x-32 hidden lg:block"></div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Professional expertise in all minor and major home maintenance tasks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all group">
                <div className="bg-slate-700 p-4 rounded-xl w-fit mb-6 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                  <s.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.name}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-amber-500/20">
            <div className="text-slate-900 text-center md:text-left">
              <h2 className="text-3xl font-extrabold mb-4">Ready to get it fixed?</h2>
              <p className="text-amber-950 font-medium opacity-80">Submit your request today and get a professional response within 2 hours.</p>
            </div>
            <Link 
              to="/submit" 
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all whitespace-nowrap shadow-xl"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">Professional & Insured</h3>
              <p className="text-slate-400">Rest easy knowing your home is in safe hands with our certified professionals.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-amber-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">Fast Response Times</h3>
              <p className="text-slate-400">We prioritize urgent repairs and guarantee a follow-up on the same day.</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">Guaranteed Quality</h3>
              <p className="text-slate-400">100% satisfaction guarantee. If it's not fixed right, we'll make it right.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
