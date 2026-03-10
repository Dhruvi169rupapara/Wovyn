const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

const userController = require("../controller/user.controller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/all", verifyToken, isAdmin, userController.getAllUsers);
router.delete("/:userId", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
