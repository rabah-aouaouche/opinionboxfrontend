const Article = require("../models/article");
const asyncHandler = require("express-async-handler");

const createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, tags, content } = req.body;
    const newArticle = await Article.create({
      title,
      content,
      tags,
      author: req.user._id,
    });
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
    // Filtering products
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Article.find(JSON.parse(queryStr)).populate({
      path: "author",
      select: "firstname lastname",
    });

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const articleCount = await Article.countDocuments();
      if (skip >= articleCount) throw new Error("This Page does not exists");
    }

    const article = await query;
    res.json(article);
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
