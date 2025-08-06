export const calculateTimelineStatistics = (items) => {
  if (!items || items.length === 0) {
    return {
      totalTasks: 0,
      completed: 0,
      inProgress: 0,
      duration: '0 days'
    };
  }

  const dates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  
  const durationMs = maxDate - minDate;
  const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
  const durationMonths = Math.round(durationDays / 30);
  
  let duration;
  if (durationDays < 30) {
    duration = `${durationDays} days`;
  } else if (durationMonths < 12) {
    duration = `${durationMonths} month${durationMonths !== 1 ? 's' : ''}`;
  } else {
    const years = Math.round(durationMonths / 12);
    duration = `${years} year${years !== 1 ? 's' : ''}`;
  }

  const currentDate = new Date();
  let completed = 0;
  let inProgress = 0;

  items.forEach(item => {
    const itemEnd = new Date(item.end);
    const itemStart = new Date(item.start);
    
    if (itemEnd < currentDate) {
      completed++;
    } else if (itemStart <= currentDate && itemEnd >= currentDate) {
      inProgress++;
    }
  });

  return {
    totalTasks: items.length,
    completed,
    inProgress,
    duration
  };
};
