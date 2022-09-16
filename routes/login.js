const express = require("express");
const router = express.Router();
const Controller = require("../controller/login");

router.get('/' , Controller.register)

module.exports = router;