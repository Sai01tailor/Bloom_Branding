const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const brandController = require("../controllers/brand.controller");

router.post(
  "/admin",
   authMiddleware,
  upload.array("images", 10),
  brandController.createBrand
);

router.get("/", brandController.getAllBrands);

router.put(
  "/admin/:id",
   authMiddleware,
  upload.array("images", 10),
  brandController.updateBrand
);

router.delete("/admin/:id", authMiddleware, brandController.deleteBrand);

module.exports = router;
