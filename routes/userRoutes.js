const express = require("express");
const { createUser, getUsers, getUser, updateUser, deleteUser, generateBio } = require("../controllers/userController");
const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users/:id/generate-bio", generateBio);

module.exports = router;
 
