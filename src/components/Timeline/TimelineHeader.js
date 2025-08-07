import React from "react";
import { formatDate } from "../../utils/dateUtils.js";

const TimelineHeader = ({ timelineMarkers, zoomLevel }) => {
  return (
    <div
      className="relative bg-gray-50 min-w-full"
      style={{
        width: `${100 * zoomLevel}%`,
        minWidth: '100%',
        height: '72px'
      }}
    >
      {timelineMarkers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-0 h-full flex flex-col items-center justify-center group"
          style={{ left: marker.position, transform: 'translateX(-50%)' }}
        >
          {/* Simplified timeline line */}
          {index !== 0 && <div className="absolute w-px h-[70%] bg-slate-300 group-hover:bg-blue-400 transition-colors duration-200"></div>}

          {/* Clean date label - hide content for first marker */}
          {index !== 0 && (
            <div className="relative bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all duration-200">
              <div className="text-sm font-medium text-slate-600 whitespace-nowrap group-hover:text-blue-600 transition-colors duration-200">
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
