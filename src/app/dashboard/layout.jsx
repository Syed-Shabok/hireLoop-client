import { DashboardDrawer } from "@/components/dashboard/DashboardDrawer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="p-6 min-h-screen container mx-auto flex gap-6">
      <DashboardDrawer />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
