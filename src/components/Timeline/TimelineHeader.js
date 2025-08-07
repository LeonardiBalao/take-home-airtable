import React from "react";
import { cn } from "../../lib/utils.js";
import { formatDate } from "../../utils/dateUtils.js";

const TimelineHeader = ({ timelineMarkers, zoomLevel, isMobile }) => {
  return (
    <div
      className="relative bg-gray-50 min-w-full"
      style={{
        width: `${100 * zoomLevel}%`,
        minWidth: '100%',
        height: isMobile ? '48px' : '72px' // Smaller height on mobile
      }}
    >
      {timelineMarkers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-0 h-full flex flex-col items-center justify-center group"
          style={{ left: marker.position, transform: 'translateX(-50%)' }}
        >
          {/* Simplified timeline line */}
          {index !== 0 && <div className={cn(
            "absolute w-px bg-slate-300 group-hover:bg-blue-400 transition-colors duration-200",
            isMobile ? "h-[60%]" : "h-[70%]"
          )}></div>}

          {/* Clean date label - hide content for first marker */}
          {index !== 0 && (
            <div className={cn(
              "relative bg-white rounded-md border border-slate-200 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all duration-200",
              isMobile ? "px-2 py-0.5" : "px-3 py-1" // Smaller padding on mobile
            )}>
              <div className={cn(
                "font-medium text-slate-600 whitespace-nowrap group-hover:text-blue-600 transition-colors duration-200",
                isMobile ? "text-xs" : "text-sm" // Smaller text on mobile
              )}>
                {formatDate(marker.date)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimelineHeader;
