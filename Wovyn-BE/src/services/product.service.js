const prisma = require("../config/db");

exports.createProduct = async (data) => {
    return await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            image: data.image,
            categoryId: parseInt(data.categoryId),
            categoryType: data.categoryType
        },
        include: {
            category: true
        }
    });
};

exports.getAllProducts = async () => {
    return await prisma.product.findMany({
        where: {
            deletedAt: null
        },
        include: {
            category: true
        }
    });
};

exports.getProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
            category: true
        }
    });
};

exports.updateProduct = async (id, data) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            ...data,
            price: data.price ? parseFloat(data.price) : undefined,
            categoryId: data.categoryId ? parseInt(data.categoryId) : undefined
        }
    });
};

exports.deleteProduct = async (id) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            deletedAt: new Date()
        }
    });
};
