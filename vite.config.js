import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The design kit lives in public/assets and is served as plain files at /assets;
  // the app's own bundle goes to /app so the two never mix.
  build: { assetsDir: 'app' },
})
