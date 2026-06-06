"use client";

import StatsGrid from "@/components/dashboard/StatsGrid";
import { authClient } from "@/lib/auth-client";

const RecruiterDashboard = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      <h2 className="text-4xl font-semibold text-white">
        Welcome back, {user?.name}!
      </h2>
      <StatsGrid />
    </div>
  );
};

export default RecruiterDashboard;
