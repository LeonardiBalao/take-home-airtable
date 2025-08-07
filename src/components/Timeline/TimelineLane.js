import React from "react";
import { cn } from "../../lib/utils.js";
import TimelineItem from "./TimelineItem.js";

const TimelineLane = ({ 
  lane, 
  laneIndex, 
  dateRange,
  editingItem,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) => {
  return (
    <div
      className={cn(
        "relative h-16 border-b border-gray-100 overflow-hidden",
        laneIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
      )}
    >
      {lane.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
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

export default TimelineLane;
