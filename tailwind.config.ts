import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF1493',
        secondary: '#9370DB',
        accent: '#F5F5DC',
        background: '#FAFAFA',
        text: '#333333',
        'text-muted': '#666666',
      },
    },
  },
  plugins: [],
}
export default config
