// Timeline positioning calculations
export const calculateItemPosition = (item, dateRange) => {
  const itemStart = new Date(item.start);
  const itemEnd = new Date(item.end);
  const left = ((itemStart - dateRange.start) / dateRange.total) * 100;
  const durationWidth = ((itemEnd - itemStart) / dateRange.total) * 100;
  
  const textWidth = Math.max(item.name.length * 0.7, 8); // More generous for full text display
  const minWidthForText = Math.min(textWidth, 25); // Allow wider items for better text display
  
  const absoluteMinimum = durationWidth < 1 ? 4 : 5; // Good minimum sizes
  
  const width = Math.max(durationWidth, minWidthForText, absoluteMinimum);
  
  // Only constrain width if it would extend beyond timeline (leave 2% margin)
  const finalWidth = left + width > 98 ? Math.max(4, 98 - left) : width;
  
  return { left: `${left}%`, width: `${finalWidth}%` };
};
