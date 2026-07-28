function NavLink({ children, href = '#', active = false, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors duration-200 ${active ? 'text-[#0F4C81]' : 'text-[#64748B] hover:text-[#0F172A]'} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export default NavLink;
