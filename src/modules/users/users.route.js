import express from "express";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updateUser,
  login,
} from "./users.controller.js";
import { protect } from "./users.middleware.js";

export const router = express.Router();

router.post("/login", login);

router.route("/").get(protect, findAllUsers).post(createUser);

router.use(protect);

router.route("/:id").get(findOneUser).patch(updateUser).delete(deleteUser);
