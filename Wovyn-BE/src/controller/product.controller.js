const productService = require("../services/product.service");
const { productSchema } = require("../validations/product.validation");

exports.createProduct = async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }

        const { error } = productSchema.validate(productData);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const product = await productService.createProduct(productData);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }
        const product = await productService.updateProduct(req.params.id, productData);
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
