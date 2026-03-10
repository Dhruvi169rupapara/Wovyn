const userService = require("../services/user.service");
const { signupSchema, loginSchema } = require("../validations/user.validation");

exports.signup = async (req, res) => {
    try{

        const { error } = signupSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const user = await userService.signup(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to sign up'
        });
    }
}

exports.login = async (req, res) => {
    try{
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const user = await userService.login(req.body);
        res.status(200).json({
            success: true,
            message: 'Login successfully',
            data: user
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to login'
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to retrieve users'
        });
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const { userId } = req.params;
        await userService.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to delete user'
        });
    }
}
