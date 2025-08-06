/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * Implements compact, space-efficient layout with slight relaxation for text readability.
 * @returns an array of arrays containing items.
 */
function assignLanes(items) {
  const sortedItems = items.sort((a, b) =>
      new Date(a.start) - new Date(b.start)
  );
  const lanes = [];

  function calculateItemDuration(item) {
    return (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24); // days
  }

  function getMinimumBuffer(prevItem, nextItem) {
    const prevDuration = calculateItemDuration(prevItem);
    const nextDuration = calculateItemDuration(nextItem);
    
    // Calculate text requirements based on item duration and text length
    const prevTextLength = prevItem.name.length;
    const nextTextLength = nextItem.name.length;
    
    // With extended timeline, we can be less aggressive about buffers
    const estimateMinDaysForText = (textLength, duration) => {
      // With more timeline space, we need fewer characters per day
      const minDaysForText = Math.max(0.5, textLength / 10);
      return Math.min(minDaysForText, textLength / 5);
    };
    
    const prevTextNeeds = estimateMinDaysForText(prevTextLength, prevDuration);
    const nextTextNeeds = estimateMinDaysForText(nextTextLength, nextDuration);
    
    // Calculate buffer based on text overflow potential - reduced since timeline is longer
    let buffer = 0.25; // Reduced base buffer since we have more space
    
    // If previous item's text might overflow into next item's space
    if (prevTextNeeds > prevDuration) {
      buffer = Math.max(buffer, (prevTextNeeds - prevDuration) * 0.4);
    }
    
    // If next item's text needs more space
    if (nextTextNeeds > nextDuration) {
      buffer = Math.max(buffer, (nextTextNeeds - nextDuration) * 0.3);
    }
    
    // Minimum buffer for very short items to prevent overlap
    if (prevDuration <= 1 || nextDuration <= 1) {
      buffer = Math.max(buffer, 1); // Reduced from 2 days
    }
    
    // Additional buffer for long names - reduced since we have more space
    if (prevTextLength > 20 || nextTextLength > 20) {
      buffer = Math.max(buffer, 1.5); // Reduced from 2.5
    }
    
    // Extra buffer for very long names
    if (prevTextLength > 30 || nextTextLength > 30) {
      buffer = Math.max(buffer, 2); // Reduced from 3
    }
    
    return buffer;
  }

  function canItemFitInLane(item, lane) {
    if (lane.length === 0) return true;
    
    const lastItem = lane[lane.length - 1];
    const lastItemEnd = new Date(lastItem.end);
    const itemStart = new Date(item.start);
    
    // Calculate required buffer based on both items
    const requiredBuffer = getMinimumBuffer(lastItem, item);
    const bufferMs = requiredBuffer * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    
    // Item can fit if it starts after the last item ends plus any required buffer
    return (itemStart.getTime() - lastItemEnd.getTime()) >= bufferMs;
  }

  function assignItemToLane(item) {
    // Try to find the most compact lane (prioritize earlier lanes for efficiency)
    for (let i = 0; i < lanes.length; i++) {
      if (canItemFitInLane(item, lanes[i])) {
        lanes[i].push(item);
        return;
      }
    }
    
    // If no existing lane can accommodate the item, create a new one
    lanes.push([item]);
  }

  for (const item of sortedItems) {
      assignItemToLane(item);
  }
  
  return lanes;
}

export default assignLanes;
