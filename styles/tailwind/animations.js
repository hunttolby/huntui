const keyframes = {
  'fade-in-out': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.1,
    },
  },
  'page-slide-left': {
    '0%': {
      transform: 'translateX(8px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 100,
    },
  },
  'drawer-slide-left': {
    '0%': {
      transform: 'translateX(16px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 100,
    },
  },
}

const animations = {
  'fade-in-out': 'fade-in-out 0.5s infinite ease-in-out',
  'page-slide-left': 'page-slide-left 0.2s ease-out',
  'drawer-slide-left': 'drawer-slide-left 0.15s ease-in-out',
}

module.exports = {
  keyframes,
  animations,
}
