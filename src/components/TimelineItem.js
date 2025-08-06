import React, { useState } from "react";
import { cn } from "../lib/utils.js";
import { formatDate } from "../utils/dateUtils.js";
import { calculateItemPosition } from "../utils/positionUtils.js";

const TimelineItem = ({ 
  item, 
  dateRange, 
  editingItem, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit 
}) => {
  const position = calculateItemPosition(item, dateRange);
  const isEditing = editingItem === item.id;

  const handleEdit = (newName) => {
    onSaveEdit(item.id, newName);
  };

  return (
    <div
      className="absolute top-2 h-12 group cursor-pointer timeline-item"
      style={position}
    >
      <div className={cn(
        "h-full rounded-md border-2 shadow-sm transition-all duration-200",
        "bg-blue-100 border-blue-300 hover:bg-blue-200 hover:border-blue-400",
        "group-hover:shadow-md"
      )}>
        <div className="p-2 h-full flex items-center justify-between">
          {isEditing ? (
            <input
              type="text"
              defaultValue={item.name}
              className="w-full text-xs font-medium bg-transparent border-none outline-none"
              onBlur={(e) => handleEdit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEdit(e.target.value);
                } else if (e.key === 'Escape') {
                  onCancelEdit();
                }
              }}
              autoFocus
            />
          ) : (
            <span
              className="text-xs font-medium text-blue-800 truncate"
              onDoubleClick={() => onStartEdit(item.id)}
              title={`${item.name} (${formatDate(item.start)} - ${formatDate(item.end)})`}
            >
              {item.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
