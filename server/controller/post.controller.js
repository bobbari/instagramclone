const mongoose = require("mongoose");
const { restart } = require("nodemon");
//constents
const configConstants = require("../config/constents");

// Post schema
const Post = mongoose.model(configConstants?.post);

// user schema
const User = mongoose.model(configConstants?.user);

// validation
const { createPostValidate } = require("../validations/post.validation");
//PATH
const path = require("path");

const createPosts = (req, resp, next) => {
  const fileImage = req.file.filename;
  const { title, body } = req.body;
  const { error } = createPostValidate(req.body);
  if (error) {
    return resp.status(422).json({ error: error.details[0].message });
  }
  const tokenData = req.tokenData;
  console.log("req", tokenData._id);

  const post = new Post({
    title,
    body,
    photo: fileImage,
    postedBy: tokenData._id,
  });

  post
    .save()
    .then((data) => {
      //   console.log("data ", data);
      resp.json({ message: "Post create successfully", data });
    })
    .catch((err) => {
      //   console.log("err ", err);
      resp.status(500).json({ error });
    });
};

const postList = async (req, resp, next) => {
  try {
    const selectField = `_id name email`;
    const postList = await Post.find().populate("postedBy", selectField);
    if (postList) {
      resp.json({ postList });
    }
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }
};

const userPostList = async (req, resp, next) => {
  try {
    const id = req?.tokenData?._id;
    Post.find({ postedBy: id })
      .then((posts) => {
        if (posts.length > 0) {
          return resp.json({ posts });
        } else {
          return resp.json({ message: "No posts found" });
        }
      })
      .catch((error) => {
        return resp.status(500).json({ error: error.message });
      });
  } catch (error) {
    console.log("error");
  }
};

const userPostImagePreview = (req, resp, next) => {
  console.log("path ", path.format({}));
  resp.json({ path: `http://localhost:5000/` });
};

module.exports = {
  createPosts,
  postList,
  userPostList,
  userPostImagePreview,
};
