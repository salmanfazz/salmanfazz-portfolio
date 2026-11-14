/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Tailwind styles only the project demos inside the modal (.tw-scope).
  // The page shell is styled by the design kit in public/assets, so the
  // global reset is off and every utility is scoped.
  important: ".tw-scope",
  corePlugins: { preflight: false },
  theme: {
    extend: {},
  },
  plugins: [],
}
