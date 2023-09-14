import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-black' : '#000112',
        'very-dark-grey' : '#20212C',
        'dark-grey' : '#2B2C37',
        'lines-dark' : '#3E3F4E',
        'medium-grey' : '#828FA3',
        'lines-light' : '#E4EBFA',
        'light-grey' : '#F4F7FD',
        'main-purple' : '#635FC7',
        'main-purple-hover' : '#A8A4FF',
        'custom-red' : '#EA5555',
        'custom-red-hover' : '#FF9898',
      },
       backgroundImage: {
        'check-icon' : "url('/assets/icon-check.svg')",
      },
    },
  },
  plugins: [],
}
export default config
