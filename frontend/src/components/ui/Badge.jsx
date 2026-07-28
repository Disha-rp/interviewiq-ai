const variants = {
  primary: 'bg-[#0F4C81] text-white',
  secondary: 'border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]',
  success: 'bg-[#22C55E]/10 text-[#15803D]',
  warning: 'bg-[#F59E0B]/10 text-[#B45309]',
  danger: 'bg-[#EF4444]/10 text-[#B91C1C]',
};

function Badge({ children, variant = 'secondary', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant] || variants.secondary} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
