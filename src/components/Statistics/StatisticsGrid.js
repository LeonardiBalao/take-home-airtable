import React, { useMemo } from "react";
import { CheckCircle, Clock, Calendar, Target } from "lucide-react";
import StatisticsCard from "./StatisticsCard.js";
import { calculateTimelineStatistics } from "../../utils/statisticsUtils.js";

const StatisticsGrid = ({ timelineItems }) => {
  const statistics = useMemo(() => 
    calculateTimelineStatistics(timelineItems), 
    [timelineItems]
  );

  const statisticsConfig = [
    {
      icon: <Target className="w-4 h-4 text-blue-600" />,
      iconColor: "bg-blue-100",
      value: statistics.totalTasks,
      label: "Total Tasks"
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      iconColor: "bg-green-100",
      value: statistics.completed,
      label: "Completed"
    },
    {
      icon: <Clock className="w-4 h-4 text-yellow-600" />,
      iconColor: "bg-yellow-100",
      value: statistics.inProgress,
      label: "In Progress"
    },
    {
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
      iconColor: "bg-purple-100",
      value: statistics.duration,
      label: "Duration"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statisticsConfig.map((stat, index) => (
          <StatisticsCard
            key={index}
            icon={stat.icon}
            iconColor={stat.iconColor}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  );
};

export default StatisticsGrid;
