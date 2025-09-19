// Campaign API endpoints for TrendifyGo
import { Express } from "express";
import { storage } from "./storage";
import type { User } from "../shared/schema";

export function setupCampaignRoutes(app: Express) {
  // Get all campaigns for the current brand user
  app.get("/api/campaigns", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    if (user.userType !== "brand") {
      return res.status(403).json({ message: "Only brands can access campaigns" });
    }
    
    try {
      const campaigns = await storage.getCampaignsByBrandUser(user.id);
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  // Get a specific campaign
  app.get("/api/campaigns/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    const campaignId = parseInt(req.params.id);
    
    try {
      const campaign = await storage.getCampaign(campaignId);
      
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      // Ensure the campaign belongs to the current brand user
      if (user.userType === "brand" && campaign.brandUserId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });

  // Create a new campaign
  app.post("/api/campaigns", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    if (user.userType !== "brand") {
      return res.status(403).json({ message: "Only brands can create campaigns" });
    }
    
    try {
      const { title, description, budget, targetCategories, startDate, endDate } = req.body;
      
      if (!title || !budget) {
        return res.status(400).json({ message: "Title and budget are required" });
      }
      
      const campaign = await storage.createCampaign({
        brandUserId: user.id,
        title,
        description: description || null,
        budget: parseInt(budget),
        status: "draft",
        targetCategories: Array.isArray(targetCategories) ? JSON.stringify(targetCategories) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      });
      
      res.status(201).json(campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  // Update a campaign
  app.put("/api/campaigns/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    if (user.userType !== "brand") {
      return res.status(403).json({ message: "Only brands can update campaigns" });
    }
    
    const campaignId = parseInt(req.params.id);
    
    try {
      // Check if campaign exists and belongs to the user
      const existingCampaign = await storage.getCampaign(campaignId);
      if (!existingCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      if (existingCampaign.brandUserId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const { title, description, budget, status, targetCategories, startDate, endDate } = req.body;
      
      const updates: any = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (budget !== undefined) updates.budget = parseInt(budget);
      if (status !== undefined) updates.status = status;
      if (targetCategories !== undefined) {
        updates.targetCategories = Array.isArray(targetCategories) ? JSON.stringify(targetCategories) : null;
      }
      if (startDate !== undefined) updates.startDate = startDate ? new Date(startDate) : null;
      if (endDate !== undefined) updates.endDate = endDate ? new Date(endDate) : null;
      
      const updatedCampaign = await storage.updateCampaign(campaignId, updates);
      
      if (!updatedCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.json(updatedCampaign);
    } catch (error) {
      console.error("Error updating campaign:", error);
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  // Delete a campaign
  app.delete("/api/campaigns/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    if (user.userType !== "brand") {
      return res.status(403).json({ message: "Only brands can delete campaigns" });
    }
    
    const campaignId = parseInt(req.params.id);
    
    try {
      // Check if campaign exists and belongs to the user
      const existingCampaign = await storage.getCampaign(campaignId);
      if (!existingCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      if (existingCampaign.brandUserId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const deleted = await storage.deleteCampaign(campaignId);
      
      if (deleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Campaign not found" });
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });
}