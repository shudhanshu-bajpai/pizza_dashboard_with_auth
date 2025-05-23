# Google Dashboard Auth

A modern full-stack web application featuring Google OAuth authentication, a responsive dashboard UI, and a clean developer experience. Built with React, TypeScript, Vite, Tailwind CSS, and Express.

---

## Features

- **Google OAuth Login:** Secure authentication using Google accounts.
- **Protected Routes:** Only authenticated users can access dashboard pages.
- **Responsive Dashboard:** Sidebar navigation, mobile header, and adaptive layout.
- **Toast Notifications:** User feedback for login, logout, and errors.
- **TypeScript Everywhere:** Type-safe codebase for both client and server.
- **Modern UI:** Built with [shadcn/ui](https://ui.shadcn.com/) components and Tailwind CSS.

---

## Project Structure

```
.
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── data/
│   └── index.html
├── server/           # Express backend
│   ├── auth.ts
│   ├── db.ts
│   ├── index.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/           # Shared types/schema
│   └── schema.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your Google OAuth credentials and other settings.

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   - The client runs on [http://localhost:5173](http://localhost:5173)
   - The server runs on [http://localhost:3000](http://localhost:3000)

---

## Scripts

- `npm run dev` – Start both client and server in development mode
- `npm run build` – Build client and server for production
- `npm run start` – Start the production server
- `npm run check` – Type-check the codebase

---

## Notable Files

- `client/src/components/auth-provider.tsx` – Handles authentication state and context.
- `client/src/components/ui/toaster.tsx` – Toast notification system.
- `client/src/components/dashboard-layout.tsx` – Main dashboard layout with sidebar and header.
- `server/auth.ts` – Google OAuth logic.
- `shared/schema.ts` – Shared TypeScript types.

---

## Customization

- **UI:** Uses [shadcn/ui](https://ui.shadcn.com/) for reusable components.
- **Styling:** Tailwind CSS with custom configuration in `tailwind.config.ts`.
- **Routing:** Client-side routing with [wouter](https://github.com/molefrog/wouter).

---

## License

MIT

---

## Credits

- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
