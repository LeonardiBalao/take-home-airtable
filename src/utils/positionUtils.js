// Timeline positioning calculations
export const calculateItemPosition = (item, dateRange) => {
  const itemStart = new Date(item.start);
  const itemEnd = new Date(item.end);
  const left = ((itemStart - dateRange.start) / dateRange.total) * 100;
  const durationWidth = ((itemEnd - itemStart) / dateRange.total) * 100;
  
  const textWidth = Math.max(item.name.length * 0.8, 8); // Much more generous multiplier for text space
  const minWidthForText = Math.min(textWidth, 30); // Increased max width significantly
  
  const absoluteMinimum = durationWidth < 1 ? 4 : 5; // Higher minimum sizes for very short durations
  
  const width = Math.max(durationWidth, minWidthForText, absoluteMinimum);
  
  return { left: `${left}%`, width: `${width}%` };
};
