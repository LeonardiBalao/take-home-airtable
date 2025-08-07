/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * Improved to handle single-day items and provide better spacing.
 * @returns an array of arrays containing items.
 */
function assignLanes(items) {
  const sortedItems = items.sort((a, b) =>
      new Date(a.start) - new Date(b.start)
  );
  const lanes = [];

  function canItemFitInLane(item, lane) {
    if (lane.length === 0) return true;
    
    const lastItem = lane[lane.length - 1];
    const lastItemEnd = new Date(lastItem.end);
    const itemStart = new Date(item.start);
    
    // Calculate durations
    const itemDuration = (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24);
    const lastItemDuration = (new Date(lastItem.end) - new Date(lastItem.start)) / (1000 * 60 * 60 * 24);
    
    // Calculate visual space needed for text rendering
    const lastItemTextSpace = lastItem.name.length * 0.8; // Match positionUtils calculation
    const currentItemTextSpace = item.name.length * 0.8;
    
    // Add buffer for visual text spacing - much more generous
    let bufferDays = 2; // Base 2-day buffer for all items
    
    // Additional buffer for single-day items
    if (itemDuration <= 1 || lastItemDuration <= 1) {
      bufferDays = Math.max(bufferDays, 3); // 3-day buffer for single-day items
    }
    
    // Additional buffer based on text length to prevent visual overlap
    if (lastItem.name.length > 15 || item.name.length > 15) {
      bufferDays = Math.max(bufferDays, 4); // 4-day buffer for long names
    }
    
    // Extra buffer if previous item's text extends beyond its duration
    const lastItemVisualOverflow = Math.max(0, lastItemTextSpace - lastItemDuration);
    if (lastItemVisualOverflow > 0) {
      bufferDays = Math.max(bufferDays, Math.ceil(lastItemVisualOverflow) + 2);
    }
    
    const bufferMs = bufferDays * 24 * 60 * 60 * 1000;
    return (itemStart.getTime() - lastItemEnd.getTime()) >= bufferMs;
  }

  function assignItemToLane(item) {
      // Try to find an existing lane that can fit the item
      for (let i = 0; i < lanes.length; i++) {
          if (canItemFitInLane(item, lanes[i])) {
              lanes[i].push(item);
              return;
          }
      }
      // If no existing lane works, create a new one
      lanes.push([item]);
  }

  for (const item of sortedItems) {
      assignItemToLane(item);
  }
  return lanes;
}

export default assignLanes;
