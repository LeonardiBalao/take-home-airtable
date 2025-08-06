// Timeline positioning calculations
export const calculateItemPosition = (item, dateRange) => {
  const itemStart = new Date(item.start);
  const itemEnd = new Date(item.end);
  const left = ((itemStart - dateRange.start) / dateRange.total) * 100;
  const durationWidth = ((itemEnd - itemStart) / dateRange.total) * 100;
  
  const textWidth = Math.max(item.name.length * 0.3, 4);
  const minWidthForText = Math.min(textWidth, 15);
  
  const absoluteMinimum = durationWidth < 1 ? 1.5 : 2;
  
  const width = Math.max(durationWidth, minWidthForText, absoluteMinimum);
  
  return { left: `${left}%`, width: `${width}%` };
};
