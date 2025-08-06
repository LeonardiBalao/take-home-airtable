// Timeline configuration constants
export const TIMELINE_CONFIG = {
  ZOOM_MIN: 1,
  ZOOM_MAX: 2,
  ZOOM_STEP: 0.1,
  ZOOM_DEFAULT: 1,
  
  LANE_HEIGHT: 64, // 16 * 4 (h-16)
  ITEM_HEIGHT: 48, // 12 * 4 (h-12)
  ITEM_MARGIN: 8,  // 2 * 4 (top-2)
  
  HEADER_HEIGHT: 48, // 12 * 4 (h-12)
  
  DATE_PADDING_RATIO: 0.05,
  MIN_ITEM_WIDTH_PERCENTAGE: 0.5,
  
  MAX_MARKERS: 10
};

export const THEME = {
  colors: {
    primary: {
      bg: 'bg-blue-100',
      border: 'border-blue-300',
      text: 'text-blue-800',
      hoverBg: 'hover:bg-blue-200',
      hoverBorder: 'hover:border-blue-400'
    },
    background: {
      main: 'bg-gray-50',
      card: 'bg-white',
      alternating: 'bg-gray-50'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      muted: 'text-gray-600'
    },
    border: {
      light: 'border-gray-100',
      default: 'border-gray-200',
      marker: 'bg-gray-300'
    }
  }
};
