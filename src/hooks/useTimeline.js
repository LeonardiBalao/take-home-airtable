import { useState, useEffect } from "react";
import { TIMELINE_CONFIG } from "../constants/index.js";

// Custom hook for managing timeline state
export const useTimeline = (items) => {
  // Check if device is mobile
  const isMobile = () => window.innerWidth < 768; // sm breakpoint
  
  const [zoomLevel, setZoomLevel] = useState(() => {
    return isMobile() ? 2 : TIMELINE_CONFIG.ZOOM_DEFAULT;
  });
  const [editingItem, setEditingItem] = useState(null);

  // Handle window resize to adjust zoom for mobile
  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        setZoomLevel(2); // Fixed 200% zoom on mobile
      } else {
        setZoomLevel(TIMELINE_CONFIG.ZOOM_DEFAULT); // Reset to default on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    // Only allow zoom changes on desktop
    if (!isMobile()) {
      setZoomLevel(newZoomLevel);
    }
  };

  return {
    zoomLevel,
    editingItem,
    isMobile: isMobile(),
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleZoomChange
  };
};
