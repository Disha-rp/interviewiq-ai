import { LoaderCircle } from 'lucide-react';

const baseStyles = 'inline-flex items-center justify-center rounded-[14px] px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-[#0F4C81] text-white shadow-sm hover:bg-[#0B3B66] focus:ring-[#3B82F6]',
  secondary: 'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] focus:ring-[#3B82F6]',
  danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] focus:ring-[#EF4444]',
  success: 'bg-[#22C55E] text-white hover:bg-[#16A34A] focus:ring-[#22C55E]',
};

function Button({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
