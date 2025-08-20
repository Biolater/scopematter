import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  className,
  children,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap gap-4 items-center justify-between",
        className
      )}>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <p className="text-sm md:text-base text-default-500">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default SectionHeader;
