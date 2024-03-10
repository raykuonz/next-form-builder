import {
  FileTextIcon,
  MousePointerClickIcon,
  TrendingDownIcon,
  ViewIcon
} from "lucide-react";

import { getFormStats } from "@/lib/actions/form";
import StatsCard from "./stats-card";

interface StatsCardListProps {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

const StatsCardList = ({
  data,
  loading,
}: StatsCardListProps) => {
  return (
    <div className="w-full pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total visits"
        helperText="All time form visits"
        icon={<ViewIcon className="text-blue-400" />}
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total submissions"
        helperText="All time form submissions"
        icon={<FileTextIcon className="text-yellow-400" />}
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        helperText="Visits that result in form submissions"
        icon={<MousePointerClickIcon className="text-green-400" />}
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        helperText="Visis that leave without interactions"
        icon={<TrendingDownIcon className="text-red-400" />}
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  )
}

export default StatsCardList