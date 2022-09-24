const express = require("express");
const router = express.Router();
const Controller = require("../controller/login");

router.get('/' , Controller.signIn)
router.get('/dashboard' , Controller.home)
router.get('/register' , Controller.register)
router.post('/register' , Controller.registration)
router.post('/login/auth/google' , Controller.authGoogle)

module.exports = router;