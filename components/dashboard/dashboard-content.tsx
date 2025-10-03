import TopMetrics from "./top-metrics";
import BottomWidgets from "./bottom-widgets";
import { getDashboardData } from "@/lib/data/dashboard";

const DashboardContent = async () => {
  const data = await getDashboardData();
  return (
    <div className="flex flex-col gap-6">
      <TopMetrics data={data.metrics} />
      <BottomWidgets recentActivity={data.recentActivity} quickStats={data.quickStats} />
    </div>
  );
};

export default DashboardContent;
