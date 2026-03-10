# Wovyn Frontend 👔

This is the React-based frontend for the Wovyn fashion e-commerce platform. It provides a modern, interactive user experience for shoppers and an administrative interface for inventory management.

## ✨ Key Features
- **User Authentication:** Login and Register pages with validation.
- **Admin Dashboard:** Overview of system status and quick access to management tools.
- **Category Management:** Create, update, and toggle categories (MEN, WOMEN, KIDS, etc.).
- **Product Management:** Full CRUD operations for products with image support.
- **Responsive Layout:** Mobile-first design using Tailwind CSS.
- **State Management:** Redux Toolkit for consistent application state.

## 🛠️ Technology Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS & PostCSS
- **Animations:** Framer Motion
- **State:** Redux & @reduxjs/toolkit
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **HTTP Client:** Axios

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root of this directory:
```env
VITE_API_URL="http://localhost:5000/api"
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## 📂 Folder Structure
- `src/components`: UI components (Button, Modal, Sidebar, etc.).
- `src/pages`: Page components (Home, Dashboard, Login, etc.).
- `src/store`: Redux slices and store configuration.
- `src/services`: API service modules for communication with the backend.
