const express = require("express");
const router = express.Router();
const Controller = require("../controller/login");

router.get('/' , Controller.register)
router.post('/login/auth/google' , Controller.authGoogle)

module.exports = router;