import express from "express";
import { createNotes, getNotes, updateNotes, deleteNotes } from "../controller/NotesController.js";
import { getUsers ,Register, Login, refreshToken, logout } from "../controller/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);
router.get("/getusers", getUsers);

// Notes routes - all protected with verifyToken
router.get("/notes", verifyToken, getNotes); // Get all notes for logged in user
router.post("/notes", verifyToken, createNotes); // Create note for logged in user
router.put("/notes/:id", verifyToken, updateNotes); // Update specific note if owned by user
router.delete("/notes/:id", verifyToken, deleteNotes); // Delete specific note if owned by user

router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;

