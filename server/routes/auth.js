const router = require("express").Router();
//middleware
const requireLogin = require("../middlewire/requiredLogin");
// fileuploader middleware
const fileUploader = require("../middlewire/fileuploader");
// multer middleware
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
//user controller
const authController = require("../controller/user.controller");
// signup & registration
router.post("/signup", authController.signupController);
// login & signin
router.post("/signin", authController.signInController);
//private routes
router.post("/private", requireLogin, authController.privateRoute);
//image upload
router.post(
  "/uploadImage",
  requireLogin,
  upload.single("file"),
  authController.uploadImage
);

module.exports = router;
