const Project = require("../models/project.model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");


exports.createProject = async (req, res) => {
  try {
  const {
  name,
  title,
  description,
  service,
  projectLink,
  clientname,
  year
} = req.body ?? {};


    if (!req.file) {
      return res.status(400).json({ message: "Image or video is required" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    const mediaType =
      cloudinaryResponse.resource_type === "video" ? "video" : "image";

    const project = await Project.create({
      name,
      title,
      description,
      service,
      projectLink,
      clientname,
      year,
      mediaType,
      mediaUrl: cloudinaryResponse.secure_url,   
      mediaPublicId: cloudinaryResponse.public_id, 
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("❌ PROJECT CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL PROJECTS (ADMIN) =================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("service", "title")
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE PROJECT =================
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await deleteFromCloudinary(project.mediaPublicId);
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("❌ PROJECT DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= TOGGLE PROJECT STATUS =================
exports.toggleProjectStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.isActive = !project.isActive;
    await project.save();

    res.status(200).json({
      success: true,
      message: `Project ${
        project.isActive ? "activated" : "deactivated"
      } successfully`,
      isActive: project.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ACTIVE PROJECTS (PUBLIC) =================
exports.getActiveProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true })
      .populate("service", "title")
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔁 TEXT FIELDS
    if (req.body.clientname !== undefined) {
      project.clientname = req.body.clientname;
    }

    if (req.body.name !== undefined) project.name = req.body.name;
    if (req.body.title !== undefined) project.title = req.body.title;
    if (req.body.description !== undefined) project.description = req.body.description;
    if (req.body.projectLink !== undefined) project.projectLink = req.body.projectLink;
    if (req.body.year !== undefined) project.year = req.body.year;
    if (req.body.service !== undefined) project.service = req.body.service;

    // 🔁 MEDIA (optional)
    if (req.file) {
      await deleteFromCloudinary(project.mediaPublicId);

      const cloudRes = await uploadOnCloudinary(req.file.path);

      project.mediaType =
        cloudRes.resource_type === "video" ? "video" : "image";
      project.mediaUrl = cloudRes.secure_url;
      project.mediaPublicId = cloudRes.public_id;
    }

    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};