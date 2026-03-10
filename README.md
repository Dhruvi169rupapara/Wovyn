# Wovyn 🧶

Wovyn is a modern, full-stack e-commerce platform designed for the fashion industry. It features a sleek, responsive user interface with a robust administrative dashboard for managing products and categories.

## 🚀 Features

### **Frontend**
- **Sleek UI/UX:** Built with React 19 and Tailwind CSS for a premium look and feel.
- **Dynamic Animations:** Smooth transitions and micro-interactions powered by Framer Motion.
- **State Management:** Efficient global state handling using Redux Toolkit.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens.
- **Admin Dashboard:** Comprehensive tools for managing inventory and categories.
- **Authentication:** Secure login and registration flows with persistent sessions.

### **Backend**
- **Robust API:** Scalable Node.js & Express server.
- **Database Management:** Type-safe database interactions with Prisma ORM.
- **Security:** JWT-based authentication and Bcrypt password hashing.
- **Data Validation:** Strict input validation using Joi.
- **File Uploads:** Integrated image handling for products through Multer.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Redux Toolkit, Tailwind CSS, Lucide React, Axios |
| **Backend** | Node.js, Express, Prisma ORM, PostgreSQL |
| **Auth** | JSON Web Tokens (JWT), Bcrypt |
| **Tools** | Nodemon |

---

## 📂 Project Structure

```text
Wovyn/
├── Wovyn-FE/         # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views (Home, Admin, Auth)
│   │   ├── store/       # Redux state slices
│   │   └── services/    # API integration
├── Wovyn-BE/         # Node.js Backend
│   ├── src/
│   │   ├── controller/  # Request handlers
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   └── prisma/      # Database schema & migrations
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js (v18+)
- PostgreSQL Database
- npm or yarn

### **1. Clone the repository**
```bash
git clone https://github.com/Dhruvi169rupapara/Wovyn.git
cd Wovyn
```

### **2. Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd Wovyn-BE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create a `.env` file):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/wovyn_db"
   JWT_SECRET="your_jwt_secret"
   PORT=5000
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### **3. Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../Wovyn-FE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create a `.env` file):
   ```env
   VITE_API_URL="http://localhost:5000/api"
   ```
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```

---

## 📜 Available Scripts

### **Backend (`Wovyn-BE`)**
- `npm run dev`: Starts the server with Nodemon.
- `npm run start`: Starts the production server.
- `npm run prisma:studio`: Opens Prisma Studio to view database data.

### **Frontend (`Wovyn-FE`)**
- `npm run dev`: Launches the development server.
- `npm build`: Compiles the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the ISC License.
