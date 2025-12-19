const express=require("express");
const router=express.Router();
const offerController=require("../controllers/offer.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/admin", authMiddleware, offerController.createOffer);
router.put("/admin/:id", authMiddleware, offerController.updateOffer);
router.delete("/admin/:id", authMiddleware, offerController.disableOffer);
router.get("/admin", authMiddleware, offerController.getAllOffers);
router.get("/", offerController.getActiveOffers);

module.exports=router;