const express = require("express");
const router = express.Router();
const Controller = require("../controller/post");
const { upload, setDestination } = require("../middleware/image");
const validate = require("../middleware/validation");

router.get(
  "/",
  Controller.getAllPost
);
router.post(
  "/",
  setDestination("./public/images/posts/"),
  upload.single("image"),
  validate,
  Controller.createPost
);
router.put(
  "/:slug",
  setDestination("./public/images/posts/"),
  upload.single("image"),
  validate,
  Controller.updatePost
);
router.delete('/:slug' , Controller.deletePost)
router.get('/:slug' , Controller.singlePost)
router.post("/comment/:slug", Controller.comment);
router.delete("/comment/:slug",  Controller.deleteComment);
router.put("/likes/:slug", Controller.likePost);

module.exports = router;
