require('dotenv').config();
const prisma = require('../config/db');

// Get all Categories

exports.getAllCategories = async () => {
    try {
        const categories = await prisma.categories.findMany();
        return categories;
    } catch (err) {
        throw err;
    }
};

// Create Category Service
exports.createCategory = async (data) => {
    try {
        const { name, categoryType } = data;

        // Check if category already exists
        const existingCategory = await prisma.categories.findUnique({
            where: { name }
        });

        if (existingCategory) {
            throw new Error("Category already exists");
        }

        // Create Category
        const category = await prisma.categories.create({
            data: {
                name,
                categoryType
            }
        });

        return category;

    } catch (err) {
        throw err;
    }
};

// Update category
exports.updateCategory = async (data) => {
    try {
        const { id, name, categoryType } = data;

        // Check if category exists
        const existingCategory = await prisma.categories.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingCategory) {
            throw new Error("Category not found");
        }

        // Update Category
        const updatedCategory = await prisma.categories.update({
            where: { id: parseInt(id) },
            data: {
                name,
                categoryType
            }
        });

        return updatedCategory;

    } catch (err) {
        throw err;
    }
}

//delete category
exports.deleteCategory = async (id) => {
    try {
        // Check if category exists
        const existingCategory = await prisma.categories.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingCategory) {
            throw new Error("Category not found");
        }

        // Delete Category
        await prisma.categories.update({
            where: { id: parseInt(id) },
            data: {
                deletedAt: new Date(),
            }
        });

    } catch (err) {
        throw err;
    }
}

