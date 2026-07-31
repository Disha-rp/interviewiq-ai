import Card from '../ui/Card';
import Button from '../ui/Button';

function QuickActionCard({ title, description, actionLabel = 'Open', onAction, icon }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#0F172A]">{title}</p>
          {description ? <p className="mt-2 text-sm leading-6 text-[#64748B]">{description}</p> : null}
        </div>
        {icon ? <div className="rounded-[14px] bg-[#F8FAFC] p-3 text-[#0F4C81]">{icon}</div> : null}
      </div>

      {actionLabel ? (
        <div className="mt-5">
          <Button variant="secondary" className="w-full" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

export default QuickActionCard;
