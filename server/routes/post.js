const route = require("express").Router();
// mongose
const mongose = require("mongoose");
//multer
const multer = require("multer");
// path extention for node
var path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const type = file.mimetype;
    const exts = type.split("/")[type.split("/").length - 1];
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// middleware
const requireLogin = require("../middlewire/requiredLogin");

// post controller
const postController = require("../controller/post.controller");
// create post
route.post(
  "/createPost",
  upload.single("file"),
  requireLogin,
  postController.createPosts
);
// postList
route.get("/postList", requireLogin, postController.postList);
// userPostList
route.get("/userpostlist", requireLogin, postController.userPostList);
//image preview
route.get("/imageview", requireLogin, postController.userPostImagePreview);

module.exports = route;
