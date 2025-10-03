import { Card, CardBody, CardHeader } from "@heroui/card";
import { Building, Mail, User } from "lucide-react";
import type { ProjectDetail } from "@/lib/types/project.types";

export default function ClientCard({ project }: { project: ProjectDetail }) {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-default-400">Client</p>
          <h2 className="text-lg font-semibold text-default-900">Client Information</h2>
        </div>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <User className="size-5" />
        </div>
      </CardHeader>
      <CardBody className="space-y-4 text-sm text-default-600">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <User className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-default-900">{project.client.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="size-4 text-default-400" />
          <span>{project.client.email ?? "No email provided"}</span>
        </div>
        {project.client.company && (
          <div className="flex items-center gap-3">
            <Building className="size-4 text-default-400" />
            <span>{project.client.company}</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

