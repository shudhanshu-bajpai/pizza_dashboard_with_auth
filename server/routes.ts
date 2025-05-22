import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  const MemorySessionStore = MemoryStore(session);

  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "pizza-dashboard-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
      store: new MemorySessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Initialize passport and session
  app.use(passport.initialize());
  app.use(passport.session());

  // Demo user for testing
  const demoUser = {
    id: 999,
    googleId: "demo-user-123",
    name: "Demo User",
    firstName: "Demo",
    email: "demo@example.com",
    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff",
    createdAt: new Date()
  };

  // For demo: Create a user if it doesn't exist
  storage.getUserByGoogleId(demoUser.googleId).then(user => {
    if (!user) {
      storage.createUser({
        googleId: demoUser.googleId,
        name: demoUser.name,
        firstName: demoUser.firstName,
        email: demoUser.email,
        avatar: demoUser.avatar
      });
    }
  });

  // Simplified authentication for demo
  app.post("/api/auth/demo-login", (req, res, next) => {
    // Set the demo user in the session
    req.login(demoUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ user: demoUser });
    });
  });

  // Serialize and deserialize user
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      // For demo user
      if (id === 999) {
        return done(null, demoUser);
      }
      
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Session endpoint
  app.get("/api/auth/session", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Authentication middleware for protected routes
  const requireAuth = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Not authenticated" });
  };

  // Pizza order routes
  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getPizzaOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const order = await storage.getPizzaOrderById(parseInt(req.params.id));
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
