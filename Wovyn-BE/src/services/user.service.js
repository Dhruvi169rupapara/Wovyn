require("dotenv").config();
const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Signup Service
exports.signup = async (data) => {
    try
    {
        const { name, email, password } = data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if(existingUser) {
            throw new Error('User already exists');
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Remove password before returning
        delete user.password;

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    catch(err){
        throw err;
    }
};

// User Login Service
exports.login = async (data) => {
    try
    {
        const { email, password } = data;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });

        if(!user) {
            throw new Error('Invalid email or password');
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Remove password before returning
        delete user.password;

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    catch(err){
        throw err;
    }
};

// Get all users (Admin Only)
exports.getAllUsers = async () => {
    try
    {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });

        return users;
    }
    catch(err){
        throw err;
    }
};

//delete user (Admin Only)
exports.deleteUser = async (userId) => {
    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });

        if (!user) {
            throw new Error("User not found");
        }

        if(user.deletedAt) {
            throw new Error("User already deleted");
        }

        // Soft delete (update deletedAt)
        const deletedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                deletedAt: new Date()
            }
        });

        return deletedUser;

    } catch (err) {
        throw err;
    }
};
