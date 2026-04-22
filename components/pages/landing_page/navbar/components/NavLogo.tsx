export function NavLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Abstract Square/S Logo matching the screenshots */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H20L12 12H8C5.79086 12 4 13.7909 4 16V28L0 34V8Z" fill="#2dc5f4"/>
        <path d="M40 32C40 36.4183 36.4183 40 32 40H20L28 28H32C34.2091 28 36 26.2091 36 24V12L40 6V32Z" fill="#12e399"/>
      </svg>
      
      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold leading-none tracking-wide text-white">SQUARE</span>
        <span className="text-[0.6rem] tracking-[0.35em] text-slate-400 mt-1 uppercase">Solutions</span>
      </div>
    </div>
  );
}
