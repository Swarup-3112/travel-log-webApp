const express = require("express");
const router = express.Router();
const Controller = require("../controller/index");

router.get('/' , Controller.hello)

module.exports = router;