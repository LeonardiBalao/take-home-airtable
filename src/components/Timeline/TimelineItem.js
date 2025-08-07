import React, { useState } from "react";
import { cn } from "../../lib/utils.js";
import { formatDate } from "../../utils/dateUtils.js";
import { calculateItemPosition } from "../../utils/positionUtils.js";

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

  // Only truncate if the item would extend beyond the timeline boundary
  const itemRight = parseFloat(position.left) + parseFloat(position.width);
  const wouldOverflow = itemRight > 98; // Allow 2% margin from edge
  
  const shouldAbbreviate = wouldOverflow && item.name.length > 10;
  const displayText = shouldAbbreviate
    ? `${item.name.substring(0, Math.max(5, Math.floor(item.name.length * 0.6)))}...`
    : item.name; // Show full text unless it would overflow the timeline

  return (
    <div
      className="absolute top-1 sm:top-2 h-10 sm:h-12 group cursor-pointer touch-manipulation hover:z-50"
      style={position}
    >
      <div className={cn(
        "h-full rounded-xl border shadow-sm transition-all duration-300 overflow-hidden relative",
        "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50",
        "border-blue-200/50 hover:border-blue-300",
        "hover:shadow-lg hover:shadow-blue-200/30 active:shadow-lg",
        "backdrop-blur-sm",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
      )}>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-l-xl group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-300"></div>
        
        <div className="p-1 sm:p-2 h-full flex items-center justify-between min-w-0 ml-1">
          {isEditing ? (
            <input
              type="text"
              defaultValue={item.name}
              className="w-full text-xs sm:text-sm font-medium bg-transparent border-none outline-none min-w-0 text-slate-700 placeholder-slate-400"
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
              className={cn(
                "font-medium select-none leading-tight transition-colors duration-300",
                "text-slate-700 group-hover:text-slate-800",
                "text-xs sm:text-sm", // Consistent text size for all items
                "whitespace-nowrap overflow-hidden text-ellipsis relative" // Restore overflow control with ellipsis
              )}
              onDoubleClick={() => onStartEdit(item.id)}
              onTouchEnd={(e) => {
                e.preventDefault();
                const now = Date.now();
                const lastTouch = e.target.dataset.lastTouch;
                if (lastTouch && (now - parseInt(lastTouch)) < 300) {
                  onStartEdit(item.id);
                }
                e.target.dataset.lastTouch = now;
              }}
              title={`${item.name} (${formatDate(item.start)} - ${formatDate(item.end)})`}
            >
              {displayText}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-50/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
          )}
          
          {parseFloat(position.width) > 3 && !isEditing && (
            <div className="ml-1 px-1 py-0.5 bg-blue-200/50 text-blue-700 text-[9px] sm:text-[10px] font-medium rounded-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {Math.max(1, Math.ceil((new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24)))}d
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default TimelineItem;
