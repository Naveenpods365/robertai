import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to create absolute paths
const resolvePath = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", {
            "runtime": "automatic"
          }]
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolvePath("client/src"),
      "@shared": resolvePath("shared"),
      "@assets": resolvePath("attached_assets"),
    },
  },
  root: resolvePath("client"),
  build: {
    outDir: resolvePath("../dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-toast',
      'class-variance-authority',
      'lucide-react',
    ],
  },
});
