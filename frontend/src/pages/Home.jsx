import {
  Calendar,
  Video,
  Users,
} from "lucide-react";

import StatCard from "../component/dashboard/StatCard.jsx";
import QuickActions from "../component/dashboard/QuickActions.jsx";
import UpcomingMeetings from "../component/dashboard/UpcomingMeeting.jsx";
import RecentActivity from "../component/dashboard/RecentActivity.jsx";

const Home = () => {
  return (
    <div className="space-y-8">

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Total Meetings"
          value="12"
          description="Meetings created"
          icon={Video}
        />

        <StatCard
          title="Upcoming"
          value="3"
          description="Scheduled meetings"
          icon={Calendar}
        />

        <StatCard
          title="Participants"
          value="28"
          description="Total participants"
          icon={Users}
        />

      </div>

      {/* Bottom Section */}

      <div className="grid gap-6 lg:grid-cols-2">

        <QuickActions />

        <UpcomingMeetings />

      </div>

      <RecentActivity />

    </div>
  );
};

export default Home;