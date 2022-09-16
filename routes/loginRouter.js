const express = require("express");
const router = express.Router();
const Controller = require("../controller/loginContoller");

router.get('/' , Controller.register)

module.exports = router;