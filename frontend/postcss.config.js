// postcss.config.js
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss, // Registers the Tailwind v4 plugin
    autoprefixer, // Registers Autoprefixer
  ],
};