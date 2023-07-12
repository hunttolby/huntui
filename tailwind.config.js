/** @type {import('tailwindcss').Config} */
const { colors, scalingObj, typography, boxShadow, animations, keyframes } = require('./styles/tailwind')
module.exports = {
  content: ["./stories/**/*.{html,js,jsx,ts,tsx}", "./components/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    backgroundColor: colors.backgroundColor,
    textColor: colors.textColor,
    borderColor: colors.borderColor,
    outlineColor: colors.backgroundColor,
    extend: {
      colors: { ...colors.backgroundColor, ...colors.textColor },
      spacing: scalingObj,
      borderRadius: scalingObj,
      boxShadow: boxShadow,
      animation: animations,
      keyframes: keyframes,
      fontSize: { ...scalingObj, ...typography },
      fontFamily: {
        serif: 'Inter',
      },
    },
  },
  plugins: [],
}

