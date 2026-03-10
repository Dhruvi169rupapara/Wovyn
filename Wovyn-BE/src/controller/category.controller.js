const categoryService = require('../services/category.service');
const { createCategorySchema } = require('../validations/category.validation');

exports.getAllCategories = async function (req, res) {
    try{
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            data: categories
        });
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to fetch categories'
        });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const { error } = createCategorySchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const category = await categoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to create category'
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryType } = req.body;

        const updatedCategory = await categoryService.updateCategory({ id, name, categoryType });
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to update category'
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await categoryService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to delete category'
        });
    }
}
