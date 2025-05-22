import { 
  users, 
  type User, 
  type InsertUser, 
  pizzaOrders, 
  type PizzaOrder, 
  type InsertPizzaOrder,
  OrderStatus,
  PizzaType
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Pizza order operations
  getPizzaOrders(): Promise<PizzaOrder[]>;
  getPizzaOrderById(id: number): Promise<PizzaOrder | undefined>;
  getPizzaOrderByOrderId(orderId: string): Promise<PizzaOrder | undefined>;
  createPizzaOrder(order: InsertPizzaOrder): Promise<PizzaOrder>;
  updatePizzaOrderStatus(id: number, status: OrderStatus): Promise<PizzaOrder | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pizzaOrders: Map<number, PizzaOrder>;
  currentUserId: number;
  currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.pizzaOrders = new Map();
    this.currentUserId = 1;
    this.currentOrderId = 1;
    
    // Seed with some initial pizza orders
    this.seedPizzaOrders();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.googleId === googleId,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
      avatar: insertUser.avatar || null 
    };
    this.users.set(id, user);
    return user;
  }

  // Pizza order operations
  async getPizzaOrders(): Promise<PizzaOrder[]> {
    return Array.from(this.pizzaOrders.values());
  }

  async getPizzaOrderById(id: number): Promise<PizzaOrder | undefined> {
    return this.pizzaOrders.get(id);
  }

  async getPizzaOrderByOrderId(orderId: string): Promise<PizzaOrder | undefined> {
    return Array.from(this.pizzaOrders.values()).find(
      (order) => order.orderId === orderId,
    );
  }

  async createPizzaOrder(insertOrder: InsertPizzaOrder): Promise<PizzaOrder> {
    const id = this.currentOrderId++;
    const order: PizzaOrder = { 
      ...insertOrder, 
      id,
      customerId: insertOrder.customerId || null,
      orderDate: insertOrder.orderDate || null
    };
    this.pizzaOrders.set(id, order);
    return order;
  }

  async updatePizzaOrderStatus(id: number, status: OrderStatus): Promise<PizzaOrder | undefined> {
    const order = this.pizzaOrders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.pizzaOrders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Seed method to populate initial pizza orders
  private seedPizzaOrders() {
    const mockOrders: InsertPizzaOrder[] = [
      { 
        orderId: 'PZA001', 
        customerId: null, 
        customerName: 'John Smith', 
        pizzaType: PizzaType.PEPPERONI, 
        quantity: 2, 
        orderDate: new Date('2023-07-15 14:30'), 
        status: OrderStatus.DELIVERED 
      },
      { 
        orderId: 'PZA002', 
        customerId: null, 
        customerName: 'Jane Doe', 
        pizzaType: PizzaType.MARGHERITA, 
        quantity: 1, 
        orderDate: new Date('2023-07-15 15:45'), 
        status: OrderStatus.PREPARING 
      },
      { 
        orderId: 'PZA003', 
        customerId: null, 
        customerName: 'Robert Johnson', 
        pizzaType: PizzaType.VEGGIE_SUPREME, 
        quantity: 1, 
        orderDate: new Date('2023-07-15 16:20'), 
        status: OrderStatus.OUT_FOR_DELIVERY 
      },
      { 
        orderId: 'PZA004', 
        customerId: null, 
        customerName: 'Sarah Williams', 
        pizzaType: PizzaType.BBQ_CHICKEN, 
        quantity: 3, 
        orderDate: new Date('2023-07-15 17:10'), 
        status: OrderStatus.PENDING 
      },
      { 
        orderId: 'PZA005', 
        customerId: null, 
        customerName: 'Michael Brown', 
        pizzaType: PizzaType.PEPPERONI, 
        quantity: 2, 
        orderDate: new Date('2023-07-15 18:05'), 
        status: OrderStatus.CANCELLED 
      },
      { 
        orderId: 'PZA006', 
        customerId: null, 
        customerName: 'Emily Davis', 
        pizzaType: PizzaType.MARGHERITA, 
        quantity: 1, 
        orderDate: new Date('2023-07-16 11:30'), 
        status: OrderStatus.DELIVERED 
      },
      { 
        orderId: 'PZA007', 
        customerId: null, 
        customerName: 'David Wilson', 
        pizzaType: PizzaType.BBQ_CHICKEN, 
        quantity: 2, 
        orderDate: new Date('2023-07-16 12:15'), 
        status: OrderStatus.PREPARING 
      },
      { 
        orderId: 'PZA008', 
        customerId: null, 
        customerName: 'Linda Martinez', 
        pizzaType: PizzaType.VEGGIE_SUPREME, 
        quantity: 1, 
        orderDate: new Date('2023-07-16 13:40'), 
        status: OrderStatus.PENDING 
      },
    ];

    mockOrders.forEach(order => {
      this.createPizzaOrder(order);
    });
  }
}

export const storage = new MemStorage();
