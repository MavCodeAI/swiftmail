import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: "@mdx-js/react",
      })
    },
    react()
  ],
  optimizeDeps: {
    include: [
      "@mdx-js/react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tooltip",
      "framer-motion",
      "lucide-react",
      "sonner",
    ],
    exclude: [],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
          ],
          "animation-vendor": ["framer-motion"],
        },
      },
    },
  },
});
