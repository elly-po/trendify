// Storage implementation for TrendifyGo - from javascript_auth_all_persistance integration
import { users, creatorProfiles, brandProfiles, campaigns, type User, type InsertUser, type CreatorProfile, type InsertCreatorProfile, type BrandProfile, type InsertBrandProfile } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
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
  
  // Brand profile methods  
  getBrandProfile(userId: number): Promise<BrandProfile | undefined>;
  createBrandProfile(insertBrandProfile: InsertBrandProfile): Promise<BrandProfile>;
  updateBrandProfile(userId: number, updates: Partial<InsertBrandProfile>): Promise<BrandProfile | undefined>;
  
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
}

export const storage = new DatabaseStorage();