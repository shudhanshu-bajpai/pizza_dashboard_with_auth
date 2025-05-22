import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  googleId: text("google_id").notNull().unique(),
  name: text("name").notNull(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pizzaOrders = pgTable("pizza_orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  customerId: integer("customer_id").references(() => users.id),
  customerName: text("customer_name").notNull(),
  pizzaType: text("pizza_type").notNull(),
  quantity: integer("quantity").notNull(),
  orderDate: timestamp("order_date").defaultNow(),
  status: text("status").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPizzaOrderSchema = createInsertSchema(pizzaOrders).omit({
  id: true,
});

// User types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Pizza order types
export type InsertPizzaOrder = z.infer<typeof insertPizzaOrderSchema>;
export type PizzaOrder = typeof pizzaOrders.$inferSelect;

// Enums for pizza orders
export enum OrderStatus {
  PENDING = "Pending",
  PREPARING = "Preparing",
  OUT_FOR_DELIVERY = "Out for Delivery",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export enum PizzaType {
  MARGHERITA = "Margherita",
  PEPPERONI = "Pepperoni",
  VEGGIE_SUPREME = "Veggie Supreme",
  BBQ_CHICKEN = "BBQ Chicken",
}
