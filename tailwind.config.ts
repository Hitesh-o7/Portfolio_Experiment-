import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sage: ['Sage', 'sans-serif'],
        super: ['Super', 'sans-serif'],
        rosca: ['Rosca', 'sans-serif'],
        zen: ['zen', 'sans-serif'],
        ux: ['UIUX', 'sans-serif'],
        AboutMe: ['aboutme','sans-serif'],
        reddit: ['RedditSans', 'sans-serif'],
        NeueBold: ['Neue-Bold', 'sans-serif'],
        NeueMed: ['Neue-Medium', 'sans-serif'],
        NeueReg: ['Neue-Regular', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
