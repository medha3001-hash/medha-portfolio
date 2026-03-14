import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // We removed 'src/' because your app folder is directly in the main folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;