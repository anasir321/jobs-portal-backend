// creating user routes
import {
  createUser,
  searchUser,
  updateUser,
  viewUsers,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

// create user
router.post("/createUser", createUser);

// view users
router.get("/allUsers", viewUsers);

// search a particular user
router.get("/search", searchUser);

// update a user
router.patch("/updateUser/:name",updateUser);

export default router;
