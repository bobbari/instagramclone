const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fileUploader =
  (upload.single("avatar"),
  (req, resp, next) => {
    console.log("file", req.file);
    next();
  });

module.exports = fileUploader;
