import { useState } from 'react';

function MobileMenu({ children, trigger, className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`md:hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-[14px] border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold text-[#0F172A]"
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {trigger || 'Menu'}
      </button>

      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="mt-3 space-y-3 rounded-[24px] border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_30px_rgba(15,76,129,0.06)]">
          {children}
        </nav>
      ) : null}
    </div>
  );
}

export default MobileMenu;
