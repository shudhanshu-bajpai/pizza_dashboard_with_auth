import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add meta tags for SEO
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Pizza Dashboard - Manage and track your pizza orders with our intuitive dashboard';
document.head.appendChild(metaDescription);

// Add title
const title = document.createElement('title');
title.textContent = 'Pizza Dashboard';
document.head.appendChild(title);

// Add Google Fonts
const googleFonts = document.createElement('link');
googleFonts.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
googleFonts.rel = 'stylesheet';
document.head.appendChild(googleFonts);

// Add Material Icons
const materialIcons = document.createElement('link');
materialIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
materialIcons.rel = 'stylesheet';
document.head.appendChild(materialIcons);

createRoot(document.getElementById("root")!).render(<App />);
