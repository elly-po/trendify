// Authentication system for TrendifyGo - from javascript_auth_all_persistance integration
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Register endpoint - creates user and their profile
  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, email, password, userType, displayName, bio, ...profileData } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Create user account
      const user = await storage.createUser({
        username,
        email,
        password: await hashPassword(password),
        userType,
        displayName,
        bio: bio || "",
        profileImage: null,
      });

      // Create role-specific profile
      if (userType === "creator") {
        await storage.createCreatorProfile({
          userId: user.id,
          tiktokUsername: profileData.tiktokUsername || null,
          contentCategories: JSON.stringify(profileData.contentCategories || []),
          collaborationRate: profileData.collaborationRate || "0",
          availableForCollabs: "true",
        });
      } else if (userType === "brand") {
        await storage.createBrandProfile({
          userId: user.id,
          companyName: profileData.companyName || displayName,
          industry: profileData.industry || null,
          website: profileData.website || null,
          targetAudience: JSON.stringify(profileData.targetAudience || []),
          monthlyBudget: profileData.monthlyBudget || null,
          campaignGoals: JSON.stringify(profileData.campaignGoals || []),
        });
      }

      // Log the user in immediately after registration
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({
          id: user.id,
          username: user.username,
          email: user.email,
          userType: user.userType,
          displayName: user.displayName,
          bio: user.bio,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Login endpoint
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    const user = req.user as SelectUser;
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      userType: user.userType,
      displayName: user.displayName,
      bio: user.bio,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    });
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  // Get current user
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const user = req.user as SelectUser;
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      userType: user.userType,
      displayName: user.displayName,
      bio: user.bio,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    });
  });

  // Get user profile (creator or brand specific data)
  app.get("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const user = req.user as SelectUser;
      
      if (user.userType === "creator") {
        const profile = await storage.getCreatorProfile(user.id);
        res.json({ user, profile });
      } else if (user.userType === "brand") {
        const profile = await storage.getBrandProfile(user.id);
        res.json({ user, profile });
      } else {
        res.status(400).json({ message: "Invalid user type" });
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
}