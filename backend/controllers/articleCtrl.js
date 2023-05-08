const Article = require("../models/article");
const asyncHandler = require("express-async-handler");

const createArticle = asyncHandler(async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.json(newArticle);
  } catch (error) {
    throw new Error(error);
  }
});

const getarticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findArticle = await Article.findById(id);
    res.json(findArticle);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllArticle = asyncHandler(async (req, res) => {
  try {
    const getallArticles = await Article.find();
    res.json(getallArticles);
  } catch (error) {
    throw new Error(error);
  }
});

const updateArticle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteArticle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deleteArticle = await Article.findByIdAndDelete(id);

    res.json(deleteArticle);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createArticle,
  getarticle,
  getAllArticle,
  updateArticle,
  deleteArticle,
};
