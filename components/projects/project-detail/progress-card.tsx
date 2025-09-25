import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { TrendingUp } from "lucide-react";

export default function ProgressCard({
  scopeCompletionPct,
  requestsResolutionPct,
  changeApprovalPct,
  completedScope,
  totalScope,
  resolvedRequests,
  totalRequests,
  approvedChanges,
  totalChanges,
}: {
  scopeCompletionPct: number;
  requestsResolutionPct: number;
  changeApprovalPct: number;
  completedScope: number;
  totalScope: number;
  resolvedRequests: number;
  totalRequests: number;
  approvedChanges: number;
  totalChanges: number;
}) {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-default-400">
            Progress
          </p>
          <h2 className="text-lg font-semibold text-default-900">
            Delivery Snapshot
          </h2>
        </div>
        <div className="rounded-full bg-success/10 p-2 text-success">
          <TrendingUp className="size-5" />
        </div>
      </CardHeader>
      <CardBody className="space-y-5">
        <ProgressStat
          title="Scope completion"
          subtitle={`${completedScope}/${totalScope || 0} complete`}
          value={scopeCompletionPct}
        />
        <ProgressStat
          title="Requests resolved"
          subtitle={`${resolvedRequests}/${totalRequests || 0} handled`}
          value={requestsResolutionPct}
        />
        <ProgressStat
          title="Change orders approved"
          subtitle={`${approvedChanges}/${totalChanges || 0} approved`}
          value={changeApprovalPct}
        />
      </CardBody>
    </Card>
  );
}

function ProgressStat({
  title,
  subtitle,
  value,
}: {
  title: string;
  subtitle: string;
  value: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="font-medium text-default-900">{title}</p>
          <p className="text-xs text-default-500">{subtitle}</p>
        </div>
        <span className="text-sm font-semibold text-primary">{value}%</span>
      </div>
      <Progress value={value} aria-label={title} className="h-2" />
    </div>
  );
}
