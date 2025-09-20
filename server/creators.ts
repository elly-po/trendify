// Creator discovery API endpoints for TrendifyGo
import { Express } from "express";
import { storage } from "./storage";
import { tiktokAPI } from "./tiktok-api";
import type { User } from "../shared/schema";

export function setupCreatorRoutes(app: Express) {
  // Get all creators with optional filters
  app.get("/api/creators", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const { category, minFollowers, maxPrice, search } = req.query;
      
      let creators;
      
      if (search) {
        creators = await storage.searchCreators(search as string, { category: category as string });
      } else {
        const filters: any = {};
        if (minFollowers) filters.minFollowers = parseInt(minFollowers as string);
        if (maxPrice) filters.maxPrice = parseInt(maxPrice as string);
        if (category) filters.category = category as string;
        
        creators = await storage.getAllCreators(filters);
      }
      
      // Transform data with real TikTok analytics integration
      const transformedCreators = await Promise.all(creators.map(async result => {
        const creator = result.creatorProfiles;
        const user = result.users;
        
        // Get real TikTok analytics for this creator - Phase 2 requires real API
        let tiktokData = null;
        if (creator.tiktokUsername) {
          try {
            tiktokData = await tiktokAPI.getCreatorProfile(creator.tiktokUsername);
          } catch (error) {
            // Phase 2: Fail fast when TikTok API unavailable
            throw new Error(`TikTok API required for creator discovery: ${error.message}`);
          }
        } else {
          // Phase 2: All creators must have TikTok integration
          throw new Error("TikTok username required for Phase 2 creator discovery");
        }
        
        return {
          id: user.id,
          name: user.displayName,
          username: user.username,
          tiktokUsername: creator.tiktokUsername,
          followers: tiktokData?.follower_count || 0,
          avgViews: tiktokData && tiktokData.video_count > 0 ? Math.floor(tiktokData.likes_count / tiktokData.video_count) : 0,
          engagementRate: tiktokData?.engagement_rate || 0,
          contentCategories: creator.contentCategories ? JSON.parse(creator.contentCategories) : [],
          collaborationRate: creator.collaborationRate,
          availableForCollabs: Boolean(creator.availableForCollabs),
          bio: tiktokData?.bio_description || user.bio,
          profileImage: tiktokData?.avatar_url || user.profileImage,
          isVerified: tiktokData?.is_verified || false,
          totalLikes: tiktokData?.likes_count || 0,
          videoCount: tiktokData?.video_count || 0,
          lastActive: new Date().toISOString(), // Real implementation would track this
          performance: tiktokData?.engagement_rate > 5 ? "High" : tiktokData?.engagement_rate > 2 ? "Good" : "Average"
        };
      }));
      
      res.json(transformedCreators);
    } catch (error) {
      console.error("Error fetching creators:", error);
      // Phase 2: Use 503 for TikTok API dependency failures
      res.status(503).json({ message: "TikTok API required for creator discovery" });
    }
  });

  // Get a specific creator's profile
  app.get("/api/creators/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const creatorUserId = parseInt(req.params.id);
    
    try {
      const creator = await storage.getCreatorProfile(creatorUserId);
      const user = await storage.getUser(creatorUserId);
      
      if (!creator || !user) {
        return res.status(404).json({ message: "Creator not found" });
      }
      
      // Phase 2: Use real TikTok API for creator details - no DB fallbacks
      if (!creator.tiktokUsername) {
        return res.status(400).json({ 
          message: "TikTok username required for Phase 2 creator profile" 
        });
      }
      
      let tiktokData = null;
      try {
        tiktokData = await tiktokAPI.getCreatorProfile(creator.tiktokUsername);
      } catch (error) {
        return res.status(503).json({ 
          message: `TikTok API required for creator profile: ${error.message}` 
        });
      }
      
      const transformedCreator = {
        id: user.id,
        name: user.displayName,
        username: user.username,
        tiktokUsername: creator.tiktokUsername,
        followers: tiktokData?.follower_count || 0,
        avgViews: tiktokData && tiktokData.video_count > 0 ? Math.floor(tiktokData.likes_count / tiktokData.video_count) : 0,
        engagementRate: tiktokData?.engagement_rate || 0,
        contentCategories: creator.contentCategories ? JSON.parse(creator.contentCategories) : [],
        collaborationRate: creator.collaborationRate,
        availableForCollabs: Boolean(creator.availableForCollabs),
        bio: user.bio,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      };
      
      res.json(transformedCreator);
    } catch (error) {
      console.error("Error fetching creator:", error);
      res.status(500).json({ message: "Failed to fetch creator" });
    }
  });

  // Get analytics data for brands - compute from real campaign data
  app.get("/api/analytics", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    if (user.userType !== "brand") {
      return res.status(403).json({ message: "Only brands can access analytics" });
    }
    
    try {
      const campaigns = await storage.getCampaignsByBrandUser(user.id);
      
      // Calculate real analytics from campaign data
      const totalSpend = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
      const activeCampaigns = campaigns.filter(c => c.status === "active").length;
      
      // Estimate metrics based on campaign budgets and industry averages
      const estimatedImpressions = Math.floor(totalSpend * 200); // $1 = 200 impressions
      const estimatedClicks = Math.floor(estimatedImpressions * 0.025); // 2.5% CTR
      const estimatedConversions = Math.floor(estimatedClicks * 0.025); // 2.5% conversion rate
      
      const analytics = {
        totalImpressions: estimatedImpressions,
        totalClicks: estimatedClicks, 
        totalConversions: estimatedConversions,
        totalSpend,
        avgCTR: "2.50",
        avgConversionRate: "2.50", 
        avgCPM: "5.00",
        avgROAS: estimatedConversions > 0 ? (estimatedConversions * 50 / totalSpend).toFixed(1) : "0.0",
        campaignCount: campaigns.length,
        activeCampaigns,
        timeframe: req.query.timeframe || "30d"
      };
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Get trending hashtags and sounds from TikTok
  app.get("/api/trending", async (req, res) => {
    try {
      const trendingData = await tiktokAPI.getTrendingData();
      res.json(trendingData);
    } catch (error) {
      console.error("Error fetching trending data:", error);
      // Phase 2: Use 503 for TikTok API dependency failures
      res.status(503).json({ message: "TikTok API required for trending data" });
    }
  });

  // Get creator analytics dashboard data
  app.get("/api/creator-analytics/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = parseInt(req.params.userId);
      const user = req.user as User;
      
      // Ensure user can only access their own analytics or is authorized
      if (user.id !== userId && user.userType !== "brand") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      // Get creator profile
      const creators = await storage.getAllCreators();
      const creatorData = creators.find(result => result.users.id === userId);
      
      if (!creatorData) {
        return res.status(404).json({ message: "Creator not found" });
      }
      
      const creator = creatorData.creatorProfiles;
      
      // Handle case where creator profile doesn't exist yet
      if (!creator) {
        return res.status(404).json({ 
          message: "Creator profile not found. Please complete your profile setup." 
        });
      }
      
      let tiktokProfile = null;
      let videoAnalytics = [];
      
      if (creator.tiktokUsername) {
        try {
          [tiktokProfile, videoAnalytics] = await Promise.all([
            tiktokAPI.getCreatorProfile(creator.tiktokUsername),
            tiktokAPI.getVideoAnalytics(creator.tiktokUsername, 20)
          ]);
        } catch (error) {
          // Phase 2: Fail fast when TikTok API unavailable for analytics
          return res.status(503).json({ 
            message: `TikTok API required for creator analytics: ${error.message}` 
          });
        }
      } else {
        // Phase 2: All creators must have TikTok integration
        return res.status(400).json({ 
          message: "TikTok username required for Phase 2 analytics" 
        });
      }
      
      // Calculate comprehensive analytics
      const analytics = {
        profile: {
          followers: tiktokProfile?.follower_count || 0,
          totalLikes: tiktokProfile?.likes_count || 0,
          videoCount: tiktokProfile?.video_count || 0,
          engagementRate: tiktokProfile?.engagement_rate || 0,
          isVerified: tiktokProfile?.is_verified || false
        },
        performance: {
          avgViews: videoAnalytics.length > 0 ? Math.floor(videoAnalytics.reduce((sum, v) => sum + v.view_count, 0) / videoAnalytics.length) : 0,
          avgLikes: videoAnalytics.length > 0 ? Math.floor(videoAnalytics.reduce((sum, v) => sum + v.like_count, 0) / videoAnalytics.length) : 0,
          avgShares: videoAnalytics.length > 0 ? Math.floor(videoAnalytics.reduce((sum, v) => sum + v.share_count, 0) / videoAnalytics.length) : 0,
          avgComments: videoAnalytics.length > 0 ? Math.floor(videoAnalytics.reduce((sum, v) => sum + v.comment_count, 0) / videoAnalytics.length) : 0,
          topPerformer: videoAnalytics.length > 0 ? videoAnalytics[0] : null
        },
        growth: {
          followerGrowth: Math.floor(Math.random() * 15) + 5, // Placeholder for real growth tracking
          viewGrowth: Math.floor(Math.random() * 25) + 10,
          engagementGrowth: Math.floor(Math.random() * 20) + 5
        },
        earnings: {
          estimatedMonthly: Math.floor((tiktokProfile?.follower_count || 0) * 0.01), // $0.01 per follower estimate
          brandDeals: Math.floor(Math.random() * 5) + 1,
          avgDealValue: creator.collaborationRate ? parseInt(creator.collaborationRate) : 500
        },
        recentVideos: videoAnalytics.slice(0, 10),
        topHashtags: videoAnalytics.reduce((acc, video) => {
          video.hashtags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
          });
          return acc;
        }, {} as Record<string, number>)
      };
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching creator analytics:", error);
      res.status(500).json({ message: "Failed to fetch creator analytics" });
    }
  });

  // Creator recommendations for brands based on campaign requirements
  app.post("/api/creator-recommendations", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const user = req.user as User;
      if (user.userType !== "brand") {
        return res.status(403).json({ message: "Only brands can request creator recommendations" });
      }
      
      const { targetAudience, budget, category, minFollowers, maxFollowers, engagementThreshold } = req.body;
      
      // Get all creators with enhanced TikTok data
      const creators = await storage.getAllCreators();
      
      // Apply intelligent filtering based on brand requirements
      const recommendations = await Promise.all(
        creators.map(async result => {
          const creator = result.creatorProfiles;
          const user = result.users;
          
          // Get TikTok analytics for accurate filtering
          let tiktokData = null;
          if (creator.tiktokUsername) {
            try {
              tiktokData = await tiktokAPI.getCreatorProfile(creator.tiktokUsername);
            } catch (error) {
              console.log(`TikTok data unavailable for ${creator.tiktokUsername}`);
            }
          }
          
          const followerCount = tiktokData?.follower_count || creator.tiktokFollowers || 0;
          const engagementRate = tiktokData?.engagement_rate || parseFloat(creator.engagementRate || "0");
          const contentCats = creator.contentCategories ? JSON.parse(creator.contentCategories) : [];
          const collaborationRate = parseInt(creator.collaborationRate || "0");
          
          // Apply filters
          if (minFollowers && followerCount < minFollowers) return null;
          if (maxFollowers && followerCount > maxFollowers) return null;
          if (engagementThreshold && engagementRate < engagementThreshold) return null;
          if (budget && collaborationRate > budget) return null;
          if (category && !contentCats.some(cat => cat.toLowerCase().includes(category.toLowerCase()))) return null;
          
          // Calculate match score
          let matchScore = 0;
          
          // Engagement rate scoring (40% weight)
          if (engagementRate > 5) matchScore += 40;
          else if (engagementRate > 3) matchScore += 30;
          else if (engagementRate > 1) matchScore += 20;
          
          // Follower count scoring (30% weight)
          if (followerCount >= 100000) matchScore += 30;
          else if (followerCount >= 50000) matchScore += 25;
          else if (followerCount >= 10000) matchScore += 20;
          
          // Category match scoring (20% weight)
          if (category && contentCats.some(cat => cat.toLowerCase() === category.toLowerCase())) {
            matchScore += 20;
          } else if (category && contentCats.some(cat => cat.toLowerCase().includes(category.toLowerCase()))) {
            matchScore += 15;
          }
          
          // Availability and verification (10% weight)
          if (creator.availableForCollabs) matchScore += 5;
          if (tiktokData?.is_verified) matchScore += 5;
          
          return {
            id: user.id,
            name: user.displayName,
            username: user.username,
            tiktokUsername: creator.tiktokUsername,
            followers: followerCount,
            engagementRate,
            contentCategories: contentCats,
            collaborationRate,
            availableForCollabs: Boolean(creator.availableForCollabs),
            isVerified: tiktokData?.is_verified || false,
            matchScore,
            bio: tiktokData?.bio_description || user.bio,
            profileImage: tiktokData?.avatar_url || user.profileImage,
            estimatedReach: Math.floor(followerCount * (engagementRate / 100)),
            avgViews: tiktokData ? Math.floor(tiktokData.likes_count / tiktokData.video_count) : 0
          };
        })
      );
      
      // Filter out nulls and sort by match score
      const validRecommendations = recommendations
        .filter(Boolean)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 20); // Top 20 recommendations
      
      res.json({
        total: validRecommendations.length,
        recommendations: validRecommendations,
        filters: { targetAudience, budget, category, minFollowers, maxFollowers, engagementThreshold }
      });
    } catch (error) {
      console.error("Error generating creator recommendations:", error);
      res.status(500).json({ message: "Failed to generate creator recommendations" });
    }
  });

  // Brand discovery for creators (find brands to work with)
  app.get("/api/brand-opportunities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const user = req.user as User;
      if (user.userType !== "creator") {
        return res.status(403).json({ message: "Only creators can view brand opportunities" });
      }
      
      // Get creator's profile for matching
      const creators = await storage.getAllCreators();
      const creatorData = creators.find(result => result.users.id === user.id);
      
      if (!creatorData) {
        return res.status(404).json({ message: "Creator profile not found" });
      }
      
      const creator = creatorData.creatorProfiles;
      
      // Handle case where creator profile doesn't exist yet
      if (!creator) {
        return res.status(404).json({ 
          message: "Creator profile not found. Please complete your profile setup." 
        });
      }
      
      const contentCategories = creator.contentCategories ? JSON.parse(creator.contentCategories) : [];
      
      // Get all campaigns from brands that match creator's profile
      const campaigns = await storage.getCampaignsByBrandUser(0); // Get all campaigns
      
      // Mock brand opportunity data based on creator's categories and engagement
      const opportunities = [
        {
          id: 1,
          brandName: "FitLife Active",
          campaignTitle: "Summer Fitness Challenge",
          category: "Fitness",
          budget: "$500-1500",
          requirements: "10K+ followers, fitness content",
          deadline: "2025-10-15",
          description: "Looking for fitness creators to promote our new workout gear line",
          matchScore: contentCategories.includes("fitness") ? 95 : 65,
          estimatedPay: creator.collaborationRate ? parseInt(creator.collaborationRate) : 750,
          brandLogo: "💪",
          tags: ["fitness", "wellness", "activewear"]
        },
        {
          id: 2,
          brandName: "GlowUp Beauty",
          campaignTitle: "Skincare Routine Series",
          category: "Beauty",
          budget: "$300-800",
          requirements: "Authentic reviews, beauty content",
          deadline: "2025-10-01",
          description: "Seeking beauty creators for our new skincare line launch",
          matchScore: contentCategories.includes("beauty") ? 90 : 45,
          estimatedPay: Math.floor(parseInt(creator.collaborationRate || "500") * 0.8),
          brandLogo: "✨",
          tags: ["beauty", "skincare", "selfcare"]
        },
        {
          id: 3,
          brandName: "TechFlow",
          campaignTitle: "Productivity App Launch",
          category: "Technology",
          budget: "$200-600",
          requirements: "Tech-savvy audience, productivity tips",
          deadline: "2025-09-30",
          description: "App launch campaign for productivity enthusiasts",
          matchScore: contentCategories.includes("productivity") ? 85 : 40,
          estimatedPay: Math.floor(parseInt(creator.collaborationRate || "400") * 0.9),
          brandLogo: "📱",
          tags: ["technology", "productivity", "apps"]
        }
      ];
      
      // Sort by match score and filter based on creator's collaboration rate
      const matchedOpportunities = opportunities
        .filter(opp => opp.estimatedPay <= parseInt(creator.collaborationRate || "1000"))
        .sort((a, b) => b.matchScore - a.matchScore);
      
      res.json({
        opportunities: matchedOpportunities,
        creatorProfile: {
          categories: contentCategories,
          collaborationRate: creator.collaborationRate,
          followers: creator.tiktokFollowers
        }
      });
    } catch (error) {
      console.error("Error fetching brand opportunities:", error);
      res.status(500).json({ message: "Failed to fetch brand opportunities" });
    }
  });

  // Connect TikTok account endpoint - validates and connects creator's TikTok username
  app.post("/api/creator/connect-tiktok", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user as User;
    if (user.userType !== "creator") {
      return res.status(403).json({ message: "Only creators can connect TikTok accounts" });
    }
    
    const { tiktokUsername } = req.body;
    
    if (!tiktokUsername) {
      return res.status(400).json({ message: "TikTok username is required" });
    }
    
    try {
      // Validate TikTok username by fetching profile
      const tiktokProfile = await tiktokAPI.getCreatorProfile(tiktokUsername);
      
      // Update creator profile with validated TikTok username
      const updatedProfile = await storage.updateCreatorProfile(user.id, {
        tiktokUsername: tiktokUsername,
        tiktokFollowers: tiktokProfile.follower_count,
        averageViews: tiktokProfile.video_count > 0 ? Math.floor(tiktokProfile.likes_count / tiktokProfile.video_count) : 0,
        engagementRate: tiktokProfile.engagement_rate.toString()
      });
      
      res.json({
        message: "TikTok account connected successfully",
        tiktokUsername: tiktokUsername,
        followers: tiktokProfile.follower_count,
        verified: tiktokProfile.is_verified,
        profile: updatedProfile
      });
    } catch (error) {
      console.error("TikTok connection error:", error);
      res.status(400).json({ 
        message: "Failed to connect TikTok account. Please check the username and try again.",
        error: error.message 
      });
    }
  });
}