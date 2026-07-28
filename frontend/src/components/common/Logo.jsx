function Logo({ className = '', title = 'InterviewIQ', subtitle = 'AI', ...props }) {
  return (
    <a
      href="/"
      className={`inline-flex items-center gap-3 text-[#0F172A] no-underline ${className}`}
      aria-label={`${title} ${subtitle}`}
      {...props}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F4C81] text-sm font-semibold text-white">
        {subtitle}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">{title}</span>
        <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#64748B]">
          {subtitle}
        </span>
      </span>
    </a>
  );
}

export default Logo;
