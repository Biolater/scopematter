import TopMetrics from "./top-metrics";
import BottomWidgets from "./bottom-widgets";

const DashboardContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <TopMetrics />
      <BottomWidgets /> 
    </div>
  );
};

export default DashboardContent;
