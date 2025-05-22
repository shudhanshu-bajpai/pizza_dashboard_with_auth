import { PizzaOrder, OrderStatus, PizzaType } from "@shared/schema";

// This file is not actually used in the app since we fetch data from the API
// It's included here for reference and as a fallback if needed

export const mockPizzaOrders: PizzaOrder[] = [
  { 
    id: 1, 
    orderId: 'PZA001', 
    customerId: null, 
    customerName: 'John Smith', 
    pizzaType: PizzaType.PEPPERONI, 
    quantity: 2, 
    orderDate: new Date('2023-07-15 14:30'), 
    status: OrderStatus.DELIVERED 
  },
  { 
    id: 2, 
    orderId: 'PZA002', 
    customerId: null, 
    customerName: 'Jane Doe', 
    pizzaType: PizzaType.MARGHERITA, 
    quantity: 1, 
    orderDate: new Date('2023-07-15 15:45'), 
    status: OrderStatus.PREPARING 
  },
  { 
    id: 3, 
    orderId: 'PZA003', 
    customerId: null, 
    customerName: 'Robert Johnson', 
    pizzaType: PizzaType.VEGGIE_SUPREME, 
    quantity: 1, 
    orderDate: new Date('2023-07-15 16:20'), 
    status: OrderStatus.OUT_FOR_DELIVERY 
  },
  { 
    id: 4, 
    orderId: 'PZA004', 
    customerId: null, 
    customerName: 'Sarah Williams', 
    pizzaType: PizzaType.BBQ_CHICKEN, 
    quantity: 3, 
    orderDate: new Date('2023-07-15 17:10'), 
    status: OrderStatus.PENDING 
  },
  { 
    id: 5, 
    orderId: 'PZA005', 
    customerId: null, 
    customerName: 'Michael Brown', 
    pizzaType: PizzaType.PEPPERONI, 
    quantity: 2, 
    orderDate: new Date('2023-07-15 18:05'), 
    status: OrderStatus.CANCELLED 
  },
  { 
    id: 6, 
    orderId: 'PZA006', 
    customerId: null, 
    customerName: 'Emily Davis', 
    pizzaType: PizzaType.MARGHERITA, 
    quantity: 1, 
    orderDate: new Date('2023-07-16 11:30'), 
    status: OrderStatus.DELIVERED 
  },
  { 
    id: 7, 
    orderId: 'PZA007', 
    customerId: null, 
    customerName: 'David Wilson', 
    pizzaType: PizzaType.BBQ_CHICKEN, 
    quantity: 2, 
    orderDate: new Date('2023-07-16 12:15'), 
    status: OrderStatus.PREPARING 
  },
  { 
    id: 8, 
    orderId: 'PZA008', 
    customerId: null, 
    customerName: 'Linda Martinez', 
    pizzaType: PizzaType.VEGGIE_SUPREME, 
    quantity: 1, 
    orderDate: new Date('2023-07-16 13:40'), 
    status: OrderStatus.PENDING 
  },
];
