// Storage implementation for TrendifyGo - from javascript_auth_all_persistance integration
import { users, creatorProfiles, brandProfiles, campaigns, type User, type InsertUser, type CreatorProfile, type InsertCreatorProfile, type BrandProfile, type InsertBrandProfile, type Campaign, type InsertCampaign } from "../shared/schema";
import { db } from "./db";
import { eq, ilike, desc, gte, lte, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Creator profile methods
  getCreatorProfile(userId: number): Promise<CreatorProfile | undefined>;
  createCreatorProfile(insertCreatorProfile: InsertCreatorProfile): Promise<CreatorProfile>;
  updateCreatorProfile(userId: number, updates: Partial<InsertCreatorProfile>): Promise<CreatorProfile | undefined>;
  getAllCreators(filters?: { category?: string; minFollowers?: number; maxPrice?: number }): Promise<any[]>;
  searchCreators(query: string, filters?: { category?: string }): Promise<any[]>;
  
  // Brand profile methods  
  getBrandProfile(userId: number): Promise<BrandProfile | undefined>;
  createBrandProfile(insertBrandProfile: InsertBrandProfile): Promise<BrandProfile>;
  updateBrandProfile(userId: number, updates: Partial<InsertBrandProfile>): Promise<BrandProfile | undefined>;
  
  // Campaign methods
  getCampaign(id: number): Promise<Campaign | undefined>;
  getCampaignsByBrandUser(brandUserId: number): Promise<Campaign[]>;
  createCampaign(insertCampaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, updates: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;
  
  sessionStore: session.SessionStore;
}

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Creator profile methods
  async getCreatorProfile(userId: number): Promise<CreatorProfile | undefined> {
    const [profile] = await db.select().from(creatorProfiles).where(eq(creatorProfiles.userId, userId));
    return profile || undefined;
  }

  async createCreatorProfile(insertCreatorProfile: InsertCreatorProfile): Promise<CreatorProfile> {
    const [profile] = await db
      .insert(creatorProfiles)
      .values(insertCreatorProfile)
      .returning();
    return profile;
  }

  async updateCreatorProfile(userId: number, updates: Partial<InsertCreatorProfile>): Promise<CreatorProfile | undefined> {
    const [profile] = await db
      .update(creatorProfiles)
      .set(updates)
      .where(eq(creatorProfiles.userId, userId))
      .returning();
    return profile || undefined;
  }
  
  // Brand profile methods
  async getBrandProfile(userId: number): Promise<BrandProfile | undefined> {
    const [profile] = await db.select().from(brandProfiles).where(eq(brandProfiles.userId, userId));
    return profile || undefined;
  }

  async createBrandProfile(insertBrandProfile: InsertBrandProfile): Promise<BrandProfile> {
    const [profile] = await db
      .insert(brandProfiles)
      .values(insertBrandProfile)
      .returning();
    return profile;
  }

  async updateBrandProfile(userId: number, updates: Partial<InsertBrandProfile>): Promise<BrandProfile | undefined> {
    const [profile] = await db
      .update(brandProfiles)
      .set(updates)
      .where(eq(brandProfiles.userId, userId))
      .returning();
    return profile || undefined;
  }
  
  // Creator discovery methods with filters
  async getAllCreators(filters?: { category?: string; minFollowers?: number; maxPrice?: number }): Promise<any[]> {
    let query = db
      .select()
      .from(creatorProfiles)
      .innerJoin(users, eq(creatorProfiles.userId, users.id));

    // Apply filters if provided
    const conditions = [];
    if (filters?.minFollowers) {
      conditions.push(gte(creatorProfiles.tiktokFollowers, filters.minFollowers));
    }
    if (filters?.category) {
      conditions.push(ilike(creatorProfiles.contentCategories, `%${filters.category}%`));
    }
    if (filters?.maxPrice) {
      conditions.push(lte(creatorProfiles.collaborationRate, filters.maxPrice.toString()));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.orderBy(desc(creatorProfiles.tiktokFollowers));
    return results;
  }

  async searchCreators(searchQuery: string, filters?: { category?: string }): Promise<any[]> {
    const conditions = [ilike(users.displayName, `%${searchQuery}%`)];
    
    if (filters?.category) {
      conditions.push(ilike(creatorProfiles.contentCategories, `%${filters.category}%`));
    }

    const results = await db
      .select()
      .from(creatorProfiles)
      .innerJoin(users, eq(creatorProfiles.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(creatorProfiles.tiktokFollowers));

    return results;
  }

  // Campaign methods
  async getCampaign(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign || undefined;
  }

  async getCampaignsByBrandUser(brandUserId: number): Promise<Campaign[]> {
    const results = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.brandUserId, brandUserId))
      .orderBy(desc(campaigns.createdAt));
    return results;
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db
      .insert(campaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }

  async updateCampaign(id: number, updates: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const [campaign] = await db
      .update(campaigns)
      .set(updates)
      .where(eq(campaigns.id, id))
      .returning();
    return campaign || undefined;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    const result = await db
      .delete(campaigns)
      .where(eq(campaigns.id, id))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();