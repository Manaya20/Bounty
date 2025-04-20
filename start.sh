#!/bin/bash

# Install PM2 globally if not already installed
npm install -g pm2

# Install dependencies
cd backend
npm install
cd ../frontend
npm install
cd ..

# Start both services using PM2
pm2 start ecosystem.config.js

# Keep the script running
pm2 logs 