const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multer.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createProject,
  getProjects,
  deleteProject,
  toggleProjectStatus,
  getActiveProjects,
  updateProject,       
} = require("../controllers/project.controller");

/* ================= PUBLIC ROUTES ================= */

// 🌍 Get active projects (for website)
router.get("/active", getActiveProjects);


/* ================= ADMIN ROUTES ================= */

// ➕ Create project
router.post(
  "/create",
  authMiddleware,
  upload.single("media"),
  createProject
);

// 📥 Get all projects
router.get("/", authMiddleware, getProjects);

// ✏️ Update project
router.put(
  "/:id",
  authMiddleware,
  upload.single("media"),
  updateProject
);

// 🔁 Toggle active / inactive
router.patch("/:id/toggle", authMiddleware, toggleProjectStatus);

// ❌ Delete project
router.delete("/:id/delete", authMiddleware, deleteProject);



module.exports = router;