function Card({
  title,
  subtitle,
  children,
  footer,
  className = '',
}) {
  return (
    <section className={`rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,76,129,0.06)] ${className}`}>
      {(title || subtitle) ? (
        <div className="mb-5">
          {title ? <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3> : null}
          {subtitle ? <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p> : null}
        </div>
      ) : null}

      {children}

      {footer ? <div className="mt-5 border-t border-[#E2E8F0] pt-4">{footer}</div> : null}
    </section>
  );
}

export default Card;
