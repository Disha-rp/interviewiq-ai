function Navbar({
  logo,
  links = [],
  actions,
  className = '',
  containerClassName = '',
}) {
  return (
    <header className={`border-b border-[#E2E8F0] bg-white/90 backdrop-blur ${className}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        <div className="flex items-center gap-3">{logo}</div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href || '#'}
              className={`text-sm font-medium transition-colors duration-200 ${link.active ? 'text-[#0F4C81]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {actions ? <div className="hidden md:block">{actions}</div> : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
