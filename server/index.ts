// Main server entry point for TrendifyGo
import express from "express";
import cors from "cors";
import { setupAuth } from "./auth";
import type { Express } from "express";

const app: Express = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? 
    process.env.FRONTEND_URL || "https://your-domain.com" : 
    "http://localhost:5000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route modules
import { setupCampaignRoutes } from "./campaigns";
import { setupCreatorRoutes } from "./creators";

// Setup authentication routes
setupAuth(app);

// Setup campaign and creator routes
setupCampaignRoutes(app);
setupCreatorRoutes(app);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TrendifyGo server running on port ${PORT}`);
  console.log(`📊 Database connected: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
  console.log(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;