// Database schema for TrendifyGo - from javascript_auth_all_persistance integration
import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(), 
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // 'creator' or 'brand'
  displayName: text("display_name").notNull(),
  profileImage: text("profile_image"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Creator-specific data
export const creatorProfiles = pgTable("creator_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  tiktokUsername: text("tiktok_username"),
  tiktokFollowers: integer("tiktok_followers").default(0),
  averageViews: integer("average_views").default(0),
  engagementRate: text("engagement_rate").default("0.0"),
  contentCategories: text("content_categories"), // JSON array of categories
  collaborationRate: text("collaboration_rate"), // Price per post
  availableForCollabs: text("available_for_collabs").default("true"),
});

// Brand-specific data  
export const brandProfiles = pgTable("brand_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  companyName: text("company_name").notNull(),
  industry: text("industry"),
  website: text("website"),
  targetAudience: text("target_audience"), // JSON array of audience segments
  monthlyBudget: text("monthly_budget"),
  campaignGoals: text("campaign_goals"), // JSON array of goals
});

// Campaigns (for brands to create and manage)
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  brandUserId: integer("brand_user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  budget: integer("budget").notNull(),
  status: text("status").default("draft"), // 'draft', 'active', 'completed', 'paused'
  targetCategories: text("target_categories"), // JSON array
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Campaign applications (creators apply to brand campaigns)
export const campaignApplications = pgTable("campaign_applications", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => campaigns.id).notNull(),
  creatorUserId: integer("creator_user_id").references(() => users.id).notNull(),
  status: text("status").default("pending"), // 'pending', 'accepted', 'rejected'
  proposedRate: text("proposed_rate"),
  message: text("message"),
  appliedAt: timestamp("applied_at").notNull().defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  userType: z.enum(["creator", "brand"]),
});

export const selectUserSchema = createSelectSchema(users);
export const insertCreatorProfileSchema = createInsertSchema(creatorProfiles);
export const insertBrandProfileSchema = createInsertSchema(brandProfiles);
export const insertCampaignSchema = createInsertSchema(campaigns);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CreatorProfile = typeof creatorProfiles.$inferSelect;
export type InsertCreatorProfile = typeof creatorProfiles.$inferInsert;
export type BrandProfile = typeof brandProfiles.$inferSelect;
export type InsertBrandProfile = typeof brandProfiles.$inferInsert;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;