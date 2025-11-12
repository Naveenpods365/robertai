#!/bin/bash

# Install required dependencies
npm install --save-dev @types/node @types/react @types/react-dom @vitejs/plugin-react

# Install Replit plugins (optional, only if needed for Replit)
npm install --save-dev @replit/vite-plugin-runtime-error-modal @replit/vite-plugin-cartographer @replit/vite-plugin-dev-banner

# Install Vite types
npm install --save-dev vite @types/vite/client

echo "Setup complete! You can now build and deploy to Netlify."
