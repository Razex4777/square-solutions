export function NavLinks() {
  const links = ['Home', 'About Us', 'Our Services', 'FAQ'];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <a 
          key={link} 
          href={`#${link.toLowerCase().replace(' ', '-')}`}
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          {link}
        </a>
      ))}
    </nav>
  );
}
