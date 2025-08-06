import React from "react";
import TimelineLane from "./TimelineLane.js";

const TimelineLanes = ({ 
  lanes, 
  zoomLevel, 
  dateRange,
  editingItem,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) => {
  return (
    <div 
      className="relative min-w-full"
      style={{ 
        width: `${100 * zoomLevel}%`,
        minWidth: '100%'
      }}
    >
      {lanes.map((lane, laneIndex) => (
        <TimelineLane
          key={laneIndex}
          lane={lane}
          laneIndex={laneIndex}
          dateRange={dateRange}
          editingItem={editingItem}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
};

export default TimelineLanes;
