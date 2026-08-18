import React from 'react';
import { Home, CheckCircle2, ShieldCheck, DollarSign, Clock } from 'lucide-react';

interface SubletActivity {
  id: string;
  subletTitle: string;
  location: string;
  monthlyRentUSD: number;
  subleasedToStudent: string;
  subleasedByStudent: string;
  completedAgo: string;
}

const RECENT_HOUSING_ACTIVITY: SubletActivity[] = [
  {
    id: 'act-1',
    subletTitle: 'Modern Luxury Studio - Science Quad',
    location: '402 University Ave',
    monthlyRentUSD: 950,
    subleasedToStudent: 'Lucas Vance',
    subleasedByStudent: 'Chloe Bennett',
    completedAgo: '2 hours ago',
  },
  {
    id: 'act-2',
    subletTitle: 'Spacious Master Bedroom Townhouse',
    location: '118 College Ave',
    monthlyRentUSD: 720,
    subleasedToStudent: 'David Chen',
    subleasedByStudent: 'Liam O\'Connor',
    completedAgo: '5 hours ago',
  },
  {
    id: 'act-3',
    subletTitle: 'Cozy 1BDR Apartment Near Engineering Quad',
    location: '709 Highland Rd',
    monthlyRentUSD: 1100,
    subleasedToStudent: 'Sophia Lin',
    subleasedByStudent: 'Samantha Lin',
    completedAgo: '1 day ago',
  },
];

export default function HousingActivityTimeline() {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">184</div>
            <div className="text-slate-400 text-xs font-medium">Active Campus Sublets</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">100%</div>
            <div className="text-slate-400 text-xs font-medium">Student Verified Identity</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">$0</div>
            <div className="text-slate-400 text-xs font-medium">Peer Brokerage Fees</div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-emerald-400" /> Recent Campus Housing Leases & Transfers
      </h3>

      <div className="space-y-4">
        {RECENT_HOUSING_ACTIVITY.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-5 hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500/10 text-emerald-400 text-[11px] px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  {item.location}
                </span>
                <span className="text-slate-500 text-xs font-mono">{item.completedAgo}</span>
              </div>
              <h4 className="text-base font-bold text-slate-100">{item.subletTitle}</h4>
              <div className="text-xs text-slate-400 mt-1">
                Leased by <span className="text-slate-200 font-semibold">{item.subleasedByStudent}</span> to{' '}
                <span className="text-slate-200 font-semibold">{item.subleasedToStudent}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-emerald-400 font-mono font-extrabold text-lg bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20">
                ${item.monthlyRentUSD}/mo
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Agreement Signed
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
