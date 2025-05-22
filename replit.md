# Pizza Dashboard Application

## Overview

This repository contains a full-stack web application called "Pizza Dashboard" for managing and tracking pizza orders. The application uses a modern React frontend with a Node.js/Express backend. It includes user authentication via Google OAuth, a database layer using Drizzle ORM, and a polished UI built with Tailwind CSS and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a classic client-server architecture with clear separation of concerns:

1. **Frontend**: React-based single-page application (SPA) located in the `/client` directory
2. **Backend**: Express.js API server in the `/server` directory
3. **Shared code**: Common types and database schema in the `/shared` directory
4. **Database**: PostgreSQL database accessed via Drizzle ORM

The application is designed to run in a development environment using Vite's dev server for the frontend, with API requests proxied to the Express backend. In production, the Express server serves both the API and the static frontend assets.

### Key Design Decisions

- **Monorepo Structure**: The project uses a monorepo approach to keep frontend, backend, and shared code in one repository, simplifying development and deployment.
- **TypeScript**: Used throughout the codebase for type safety and better developer experience.
- **API-First Design**: The backend exposes RESTful APIs consumed by the frontend, with proper error handling and response formatting.
- **Authentication**: Uses Google OAuth via Passport.js for secure authentication.
- **Component Library**: Uses shadcn/ui components for a consistent and polished UI.

## Key Components

### Frontend

1. **Component Structure**:
   - UI components using shadcn/ui (based on Radix UI primitives)
   - Page components in `/client/src/pages`
   - Reusable components in `/client/src/components`
   - Hooks in `/client/src/hooks`

2. **State Management**:
   - React Query for server state management
   - Context API for global state (auth)
   - Local component state for UI state

3. **Routing**:
   - Uses Wouter for lightweight client-side routing
   - Protected routes that require authentication

### Backend

1. **Express Server**:
   - API routes for user authentication and pizza order management
   - Session management with express-session
   - Passport.js for Google OAuth integration

2. **Data Layer**:
   - Drizzle ORM for database access
   - Schema defined in `/shared/schema.ts`
   - In-memory storage fallback for development

3. **Authentication**:
   - Google OAuth 2.0 strategy
   - Session-based authentication
   - Protected API endpoints

### Database Schema

The application has two main data models:

1. **Users**: Store user information from Google OAuth
   - Fields: id, googleId, name, firstName, email, avatar, createdAt

2. **Pizza Orders**: Track pizza orders with their status
   - Fields: id, orderId, customerId, customerName, pizzaType, quantity, orderDate, status

## Data Flow

1. **Authentication Flow**:
   - User clicks login with Google
   - Server redirects to Google OAuth
   - Google redirects back to server with auth code
   - Server verifies code, creates user record if needed
   - Server creates session and redirects to client
   - Client fetches current session to verify authentication

2. **Order Management Flow**:
   - Authenticated users can view pizza orders
   - Orders can be filtered and sorted
   - Orders have different statuses (Pending, Preparing, Out for Delivery, Delivered, Cancelled)
   - Order status can be updated (functionality to be implemented)

## External Dependencies

### Frontend Dependencies

- **React**: Core UI library
- **Wouter**: Lightweight router for React
- **@tanstack/react-query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library based on Radix UI
- **date-fns**: Date manipulation

### Backend Dependencies

- **Express**: Web server framework
- **Passport.js**: Authentication middleware
- **express-session**: Session management
- **Drizzle ORM**: Database access layer

## Deployment Strategy

The application is configured to deploy on Replit, with specific configurations in the `.replit` file:

1. **Development Mode**:
   - Run `npm run dev` to start both frontend and backend
   - Vite serves frontend with HMR enabled
   - Express serves API endpoints
   - Uses memory-based session store

2. **Production Mode**:
   - Build process compiles frontend to static assets
   - Backend compiled with esbuild
   - Express serves both static assets and API endpoints
   - PostgreSQL database for data persistence

### Environment Variables

The application requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `GOOGLE_CLIENT_ID`: OAuth client ID for Google authentication
- `GOOGLE_CLIENT_SECRET`: OAuth client secret for Google authentication
- `SESSION_SECRET`: Secret for session encryption

### Database Setup

The database schema is managed with Drizzle ORM. The schema includes:

- `users`: Stores user information
- `pizza_orders`: Stores pizza order information

The application is currently set up to use an in-memory storage mechanism for development, but the Drizzle configuration is ready for PostgreSQL integration.

## Future Enhancements

1. **Order Creation**: Add functionality to create new pizza orders
2. **Admin Dashboard**: Add admin-specific views for order management
3. **Analytics**: Add charts and statistics for order data
4. **Notifications**: Add real-time notifications for order status changes
5. **Mobile App**: Consider building a mobile app using React Native