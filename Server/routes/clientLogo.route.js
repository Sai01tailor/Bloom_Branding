const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multer.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const clientLogoController = require("../controllers/clientLogo.controller");

router.post(
  "/admin",
   authMiddleware,
  upload.single("image"),
  clientLogoController.createClientLogo
);

router.put(
  "/admin/:id",
   authMiddleware,
  upload.single("image"),
  clientLogoController.updateClientLogo
);

router.delete(
  "/admin/:id",
   authMiddleware,
  clientLogoController.deleteClientLogo
);

router.get("/", clientLogoController.getActiveClientLogos);

module.exports = router;
