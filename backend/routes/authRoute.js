const express = require("express");
const {
  createUser,
  getallUser,
  getaUser,
  loginUserCtrl,
  logout,
  deleteaUser,
  updatedUser,
  forgotPasswordToken,
  resetPassword,
  updatePassword,
  handleRefreshToken,
} = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.get("/refresh", handleRefreshToken);

router.get("/all-users", getallUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.post("/login", loginUserCtrl);
router.get("/logout", logout);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);

module.exports = router;
