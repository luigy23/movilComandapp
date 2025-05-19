/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],


  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        manrope: [
          'Manrope_200ExtraLight',
          'Manrope_300Light',
          'Manrope_400Regular',
          'Manrope_500Medium',
          'Manrope_600SemiBold',
          'Manrope_700Bold',
          'Manrope_800ExtraBold',
        ],
      },
      fontWeight: {
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
}