// Main server entry point for TrendifyGo
import express from "express";
import { setupAuth } from "./auth";
import type { Express } from "express";

const app: Express = express();
const PORT = process.env.PORT || 5001;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });
}

// Setup authentication routes
setupAuth(app);

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