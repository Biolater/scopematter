import TopMetrics from "./top-metrics";
import BottomWidgets from "./bottom-widgets";

const DashboardContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <TopMetrics />
      <BottomWidgets /> 
    </div>
  );
};

export default DashboardContent;
