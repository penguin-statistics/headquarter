import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import viteTsconfigPath from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPath()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
  build: {
    dynamicImportVarsOptions: {
      exclude: [],
    },
  },
  envPrefix: 'PENGUIN_HEADQUARTER_',
})
