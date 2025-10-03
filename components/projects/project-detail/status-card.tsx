import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { CalendarDays, Workflow } from "lucide-react";
import type { ProjectDetail } from "@/lib/types/project.types";
import { projectStatusMeta } from "./status-meta";

export default function StatusCard({
  project,
  updatedAt,
  completedScope,
}: {
  project: ProjectDetail;
  updatedAt: string;
  completedScope: number;
}) {
  const status = projectStatusMeta[project.status];

  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-default-400">Status</p>
          <h2 className="text-lg font-semibold text-default-900">Project Health</h2>
        </div>
        <div className="rounded-full bg-warning/10 p-2 text-warning">
          <Workflow className="size-5" />
        </div>
      </CardHeader>
      <CardBody className="space-y-4 text-sm text-default-600">
        <div className="grid grid-cols-2 gap-4">
          <StatusMetric label="Scope Items" value={project._count.scopeItems} />
          <StatusMetric label="Requests" value={project._count.requests} />
          <StatusMetric label="Change Orders" value={project._count.changeOrders} />
          <StatusMetric label="Completed Scope" value={`${completedScope}/${project._count.scopeItems || 0}`} />
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-default-100/60 p-3">
          <CalendarDays className="size-4 text-default-400" />
          <div>
            <p className="text-xs uppercase text-default-400">Timeline</p>
            <p className="text-sm text-default-600">Updated {updatedAt}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Chip variant="flat" color={status.color} className="text-sm font-medium">
          {status.label}
        </Chip>
      </CardFooter>
    </Card>
  );
}

function StatusMetric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-default-100/60 p-3">
      <p className="text-xs uppercase text-default-400">{label}</p>
      <p className="text-lg font-semibold text-default-900">{value}</p>
    </div>
  );
}

