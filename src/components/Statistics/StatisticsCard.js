import React from "react";

const StatisticsCard = ({ 
  icon, 
  iconColor, 
  value, 
  label, 
  backgroundColor = "bg-white" 
}) => {
  return (
    <div className={`${backgroundColor} rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6`}>
      <div className="flex items-center">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${iconColor} rounded-lg flex items-center justify-center mr-3`}>
          <div className="w-4 h-4 sm:w-5 sm:h-5">
            {icon}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
          <p className="text-xs sm:text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
