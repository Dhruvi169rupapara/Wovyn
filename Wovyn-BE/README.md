# Wovyn Backend ⚙️

The core API for the Wovyn platform, built with Node.js, Express, and Prisma. It handles authentication, inventory persistence, and business logic.

## 🔐 Core Functionalities
- **User Authentication:** Secure registration and login using JWT and Bcrypt.
- **Role-Based Access Control:** Separate permissions for ADMIN and USER roles.
- **Product API:** Management of product data, including categories and images.
- **Category API:** Organizes products into specific sections (MEN, WOMEN, etc.).
- **Validation:** Request payload validation using Joi.
- **File Storage:** Local file uploads for product images via Multer.

## 🛠️ Technology Stack
- **Server:** Node.js & Express
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** JWT & Bcrypt
- **File Handling:** Multer
- **Validation:** Joi

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Database Setup
1. Define your `DATABASE_URL` in a `.env` file.
2. Initialize the database schema:
   ```bash
   npx prisma migrate dev
   ```

### Environment Variables
Create a `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/wovyn_db"
JWT_SECRET="your_secure_secret_key"
PORT=5000
```

### Development
```bash
npm run dev
```

## 📜 API Endpoints (Prefix: `/api`)
- `POST /user/register`: Create a new user.
- `POST /user/login`: Authenticate and receive a token.
- `GET /product`: Retrieve all products.
- `POST /product`: Create a new product (Admin only).
- `GET /category`: Retrieve all categories.
- `POST /category`: Create a new category (Admin only).

## 📂 Folder Structure
- `src/controller`: Logic for handling incoming requests.
- `src/routes`: Express route definitions.
- `src/services`: Database interaction logic.
- `src/validations`: Joi schemas for input validation.
- `src/middlewares`: Auth and error handling filters.
