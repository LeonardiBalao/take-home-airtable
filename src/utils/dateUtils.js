import { TIMELINE_CONFIG } from "../constants/index.js";

// Date utilities for timeline calculations
export const calculateDateRange = (items) => {
  if (!items.length) return { start: new Date(), end: new Date(), total: 0 };
  
  const dates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  
  // Add some padding to the timeline
  const padding = (maxDate - minDate) * TIMELINE_CONFIG.DATE_PADDING_RATIO;
  return {
    start: new Date(minDate.getTime() - padding),
    end: new Date(maxDate.getTime() + padding),
    total: maxDate.getTime() - minDate.getTime() + (padding * 2)
  };
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const generateTimelineMarkers = (dateRange) => {
  const markers = [];
  const totalDays = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24);
  const interval = totalDays > 365 ? 'month' : totalDays > 60 ? 'week' : 'day';
  
  let current = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  
  while (current <= end) {
    const position = ((current - dateRange.start) / dateRange.total) * 100;
    markers.push({
      date: new Date(current),
      position: `${position}%`
    });
    
    if (interval === 'month') {
      current.setMonth(current.getMonth() + 1);
    } else if (interval === 'week') {
      current.setDate(current.getDate() + 7);
    } else {
      current.setDate(current.getDate() + 1);
    }
  }
  
  return markers.filter((_, index) => index % Math.ceil(markers.length / TIMELINE_CONFIG.MAX_MARKERS) === 0);
};
