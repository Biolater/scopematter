import { ReactNode } from "react";

export default function TabTitle({
    icon,
    label,
    count,
  }: {
    icon: ReactNode;
    label: string;
    count: number;
  }) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{label}</span>
        <span className="rounded-full bg-primary/10 px-2 text-xs text-primary">
          {count}
        </span>
      </div>
    );
  }