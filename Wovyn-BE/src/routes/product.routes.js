const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

const upload = require("../middlewares/upload.middleware");

router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/create", verifyToken, isAdmin, upload.single("image"), productController.createProduct);
router.put("/:id", verifyToken, isAdmin, upload.single("image"), productController.updateProduct);
router.delete("/:id", verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
