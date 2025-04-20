require("dotenv").config();
const express = require("express");
const app = require("./app");
const { PORT, NODE_ENV } = require("./src/config/environment");
const SupabaseClient = require("./src/config/SupabaseClient"); // Note the correct case
const cors = require("cors");
//trial changefor deployment
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.PRODUCTION_URL]
        : ["http://localhost:5001"],
  })
);

async function startServer() {
  try {
    console.log("Starting server...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Port:", PORT);
    
    const isConnected = await SupabaseClient.checkConnection();

    if (!isConnected) {
      console.error("🚨 Failed to connect to Supabase");
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("💥 Server startup error:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

startServer();
