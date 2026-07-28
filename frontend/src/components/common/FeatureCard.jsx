function FeatureCard({
  title,
  description,
  icon,
  action,
  className = '',
}) {
  return (
    <article className={`rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,76,129,0.06)] ${className}`}>
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F8FAFC] text-[#0F4C81]">
          {icon}
        </div>
      ) : null}

      {title ? <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm leading-6 text-[#64748B]">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </article>
  );
}

export default FeatureCard;
