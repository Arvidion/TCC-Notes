import express from "express";
import { getNotes, getNoteById, createNote, updateNote, deleteNote} from "../controllers/NoteControllers.js";
import { Register, Login, refreshToken, Logout } from "../controllers/UserControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.get('/notes', verifyToken, getNotes);
router.get('/notes/:id', verifyToken, getNoteById);
router.post('/notes', verifyToken, createNote);
router.patch('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);


router.all("*", (req, res)=> {
    res.status(404).json({
        message: "Route not found"
    })
});

export default router;
