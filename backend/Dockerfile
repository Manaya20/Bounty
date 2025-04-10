FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV PORT=5001
EXPOSE 5001
CMD ["node", "server.js"]
