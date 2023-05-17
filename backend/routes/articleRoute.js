const express = require("express");
const {
  createArticle,
  getarticle,
  getAllArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
router.use(authMiddleware);
router.post("/", createArticle);
router.get("/:id", getarticle);
router.get("/", getAllArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
