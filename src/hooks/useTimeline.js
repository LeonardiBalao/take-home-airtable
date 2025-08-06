import { useState } from "react";
import { TIMELINE_CONFIG } from "../constants/index.js";

// Custom hook for managing timeline state
export const useTimeline = (items) => {
  const [zoomLevel, setZoomLevel] = useState(TIMELINE_CONFIG.ZOOM_DEFAULT);
  const [editingItem, setEditingItem] = useState(null);

  const handleStartEdit = (itemId) => {
    setEditingItem(itemId);
  };

  const handleSaveEdit = (itemId, newName) => {
    // In a real app, this would update the data
    console.log(`Update item ${itemId} to: ${newName}`);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };

  return {
    zoomLevel,
    editingItem,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleZoomChange
  };
};
