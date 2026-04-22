import { NavLogo } from './components/NavLogo';
import { NavLinks } from './components/NavLinks';
import { NavActions } from './components/NavActions';

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0D14]/80 backdrop-blur-md">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        <NavLogo />
        <NavLinks />
        <NavActions />
      </div>
    </header>
  );
}
