import Card from '../ui/Card';

function StatCard({ title, value, description, icon, accentClassName = 'text-[#0F4C81]' }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#64748B]">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-[#0F172A]">{value}</p>
          {description ? <p className="mt-2 text-sm text-[#64748B]">{description}</p> : null}
        </div>
        {icon ? <div className={`rounded-[14px] bg-[#F8FAFC] p-3 ${accentClassName}`}>{icon}</div> : null}
      </div>
    </Card>
  );
}

export default StatCard;
