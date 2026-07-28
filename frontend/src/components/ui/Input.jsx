import { forwardRef } from 'react';

const baseStyles = 'w-full rounded-[14px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[15px] text-[#0F172A] shadow-sm outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:text-[#64748B]';

const Input = forwardRef(function Input(
  { label, id, className = '', error = '', helperText = '', ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[#0F172A]">
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        ref={ref}
        className={`${baseStyles} ${error ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error || helperText ? `${inputId}-hint` : undefined}
        {...props}
      />

      {error || helperText ? (
        <p id={`${inputId}-hint`} className={`mt-2 text-sm ${error ? 'text-[#EF4444]' : 'text-[#64748B]'}`}>
          {error || helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
