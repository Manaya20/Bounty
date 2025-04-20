#!/bin/bash

# Exit on error
set -e

# Install PM2 globally if not already installed
echo "Installing PM2..."
npm install -g pm2

# Install dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ../frontend
echo "Installing frontend dependencies..."
npm install
cd ..

# Start both services using PM2
echo "Starting services with PM2..."
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Generate PM2 startup script
pm2 startup

# Keep the script running and show logs
echo "Starting PM2 logs..."
pm2 logs