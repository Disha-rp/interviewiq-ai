function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">{title}</h2> : null}
      {description ? <p className="max-w-2xl text-base leading-7 text-[#64748B]">{description}</p> : null}
    </div>
  );
}

export default SectionHeader;
