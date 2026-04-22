import { Sun } from 'lucide-react';

export function NavActions() {
  return (
    <div className="flex items-center gap-4">
      {/* Theme Toggle */}
      <button className="w-10 h-10 rounded-md border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
        <Sun className="w-4 h-4" />
      </button>
      
      {/* Language Toggle */}
      <button className="w-10 h-10 rounded-md border border-slate-700 flex items-center justify-center text-sm font-medium text-[#2dc5f4] hover:bg-slate-800 transition-colors">
        Ar
      </button>
      
      {/* CTA Button */}
      <button className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-md hover:opacity-90 transition-opacity">
        Contact Us
      </button>
    </div>
  );
}
