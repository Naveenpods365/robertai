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
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-slot',
      '@radix-ui/react-toast',
      '@radix-ui/react-accordion',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-progress',
      '@radix-ui/react-separator',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'lucide-react'
    ]
  },
  resolve: {
    alias: {
      "@": resolvePath("client/src"),
      "@shared": resolvePath("shared"),
      "@assets": resolvePath("attached_assets"),
    },
  },
  root: resolvePath("client"),
  build: {
    outDir: resolvePath("dist"),
    emptyOutDir: true,
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
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
});
