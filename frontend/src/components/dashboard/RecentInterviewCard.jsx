import Card from '../ui/Card';
import Badge from '../ui/Badge';

function RecentInterviewCard({ title, company, status, time, description, badgeVariant = 'secondary' }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#0F172A]">{title}</p>
          {company ? <p className="mt-1 text-sm text-[#64748B]">{company}</p> : null}
        </div>
        {status ? <Badge variant={badgeVariant}>{status}</Badge> : null}
      </div>

      {description ? <p className="mt-3 text-sm leading-6 text-[#64748B]">{description}</p> : null}
      {time ? <p className="mt-4 text-sm font-medium text-[#3B82F6]">{time}</p> : null}
    </Card>
  );
}

export default RecentInterviewCard;
