// Timeline positioning calculations
export const calculateItemPosition = (item, dateRange) => {
  const itemStart = new Date(item.start);
  const itemEnd = new Date(item.end);
  const left = ((itemStart - dateRange.start) / dateRange.total) * 100;
  const durationWidth = ((itemEnd - itemStart) / dateRange.total) * 100;
  
  const textWidth = Math.max(item.name.length * 0.6, 6); // More reasonable multiplier
  const minWidthForText = Math.min(textWidth, 20); // Reduced max width to prevent overflow
  
  const absoluteMinimum = durationWidth < 1 ? 3 : 4; // Reasonable minimum sizes
  
  const width = Math.max(durationWidth, minWidthForText, absoluteMinimum);
  
  // Ensure item doesn't extend beyond 100% of timeline
  const maxAllowedWidth = Math.min(width, 100 - left);
  
  return { left: `${left}%`, width: `${maxAllowedWidth}%` };
};
