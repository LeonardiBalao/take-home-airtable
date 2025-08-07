import React from "react";
import { TIMELINE_CONFIG } from "../../constants/index.js";

const TimelineControls = ({
  itemCount,
  laneCount,
  zoomLevel,
  onZoomChange,
  isMobile
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      {/* Mobile Layout - Only show title and stats, hide zoom */}
      <div className="sm:hidden space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Project Timeline
          </h2>
          <p className="text-sm text-slate-600">{itemCount} items across {laneCount} lanes</p>
        </div>
        
        {/* Hide zoom controls on mobile */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 shadow-sm border border-slate-200/50">
            <label className="text-sm font-semibold text-slate-700">
              Zoom:
            </label>
            <div className="relative flex-1 max-w-32">
              <input
                type="range"
                min={TIMELINE_CONFIG.ZOOM_MIN}
                max={TIMELINE_CONFIG.ZOOM_MAX}
                step={TIMELINE_CONFIG.ZOOM_STEP}
                value={zoomLevel}
                onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer timeline-slider"
              />
            </div>
            <span className="text-sm font-medium text-slate-600 min-w-12 px-2 py-1 bg-slate-100 rounded-md">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden sm:flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
            Project Timeline
          </h2>
          <p className="text-slate-600 mt-1">{itemCount} items across {laneCount} lanes</p>
        </div>

        <div className="flex items-center gap-4 bg-gradient-to-r from-white to-slate-50 rounded-xl px-6 py-3 shadow-sm border border-slate-200/50">
          <label className="text-sm font-semibold text-slate-700">
            Zoom:
          </label>
          <div className="relative">
            <input
              type="range"
              min={TIMELINE_CONFIG.ZOOM_MIN}
              max={TIMELINE_CONFIG.ZOOM_MAX}
              step={TIMELINE_CONFIG.ZOOM_STEP}
              value={zoomLevel}
              onChange={(e) => onZoomChange(parseFloat(e.target.value))}
              className="w-32 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer timeline-slider"
            />
          </div>
          <span className="text-sm font-medium text-slate-600 px-3 py-1 bg-slate-100 rounded-lg min-w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;
