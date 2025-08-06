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

  const handleWheel = (e) => {
    // Completely prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Only zoom when scrolling vertically (deltaY) and not horizontally scrolling
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const zoomDirection = e.deltaY > 0 ? -1 : 1; // Negative deltaY = zoom in, positive = zoom out
      const zoomStep = 0.1; // TIMELINE_CONFIG.ZOOM_STEP
      const zoomMin = 1;    // TIMELINE_CONFIG.ZOOM_MIN
      const zoomMax = 2;    // TIMELINE_CONFIG.ZOOM_MAX
      
      const newZoomLevel = Math.min(
        zoomMax,
        Math.max(zoomMin, zoomLevel + (zoomDirection * zoomStep))
      );
      
      if (newZoomLevel !== zoomLevel) {
        // Preserve scroll position relative to zoom
        const container = scrollContainerRef.current;
        if (container) {
          const scrollRatio = container.scrollLeft / Math.max(1, container.scrollWidth - container.clientWidth);
          
          handleZoomChange(newZoomLevel);
          
          // Restore scroll position after zoom
          setTimeout(() => {
            if (container) {
              const newScrollLeft = scrollRatio * (container.scrollWidth - container.clientWidth);
              container.scrollLeft = newScrollLeft;
            }
          }, 0);
        }
      }
    } else {
      // For horizontal scrolling (deltaX), allow horizontal timeline scrolling
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollLeft += e.deltaX;
      }
    }
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

  // Add wheel event listener to ensure proper event handling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const wheelHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleWheel(e);
      };
      
      container.addEventListener('wheel', wheelHandler, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', wheelHandler);
      };
    }
  }, [zoomLevel, handleZoomChange]);

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
