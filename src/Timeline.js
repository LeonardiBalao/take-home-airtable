import React, { useMemo, useRef, useState, useEffect } from "react";
import { assignLanes, calculateDateRange, generateTimelineMarkers } from "./utils/index.js";
import { useTimeline } from "./hooks/useTimeline.js";
import {
  TimelineControls,
  TimelineHeader,
  TimelineLanes,
  TimelineLegend
} from "./components/index.js";

const Timeline = ({ items }) => {
  const {
    zoomLevel,
    editingItem,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleZoomChange
  } = useTimeline(items);

  // Ref for the scrollable container
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  const dateRange = useMemo(() => calculateDateRange(items), [items]);

  const lanes = useMemo(() => assignLanes(items), [items]);

  const timelineMarkers = useMemo(() => generateTimelineMarkers(dateRange), [dateRange]);

  const handleMouseDown = (e) => {
    // Don't start dragging if clicking on interactive elements
    if (e.target.closest('.timeline-item') || e.target.closest('input')) {
      return;
    }
    
    setIsDragging(true);
    const container = scrollContainerRef.current;
    setDragStart({
      x: e.pageX,
      scrollLeft: container.scrollLeft
    });
    
    // Prevent text selection while dragging
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const container = scrollContainerRef.current;
    const deltaX = e.pageX - dragStart.x;
    container.scrollLeft = dragStart.scrollLeft - deltaX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div className="w-full p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <TimelineControls
          itemCount={items.length}
          laneCount={lanes.length}
          zoomLevel={zoomLevel}
          onZoomChange={handleZoomChange}
        />

        {/* Timeline container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto custom-scrollbar"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <TimelineHeader 
              timelineMarkers={timelineMarkers} 
              zoomLevel={zoomLevel}
            />
            
            <TimelineLanes
              lanes={lanes}
              zoomLevel={zoomLevel}
              dateRange={dateRange}
              editingItem={editingItem}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </div>

        <TimelineLegend />
      </div>
    </div>
  );
};

export default Timeline;
