const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const nanoid = require("nanoid");
const slugify = require("slugify");

const User = require("../models/User");

module.exports.signIn = (req, res) => {
  console.log("hello");
  res.render("signup.ejs" , {message: null });
};

module.exports.register = (req, res) => {
  console.log("hello");
  let message = null;
  res.render("register.ejs", { message: message });
};

module.exports.registration = async (req, res) => {
  console.log(req.body, "registration");
  let message = null;
  let response = {
    success: false,
    message: "",
  };
  let randomString = nanoid(5);
  const { name, email } = req.body;

  const validateGmailId = (url) => {
    let pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return pattern.test(url);
  };

  if (!name) {
    response.message = "Please provide a title to the event";
    fs.unlinkSync(req.file.path);
    return res.status(400).json(response);
  } else if (!validateGmailId(email)) {
    response.message = "Please enter your google id";
    return res.status(400).json(response);
  }

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      response.message = "Email has already been registered";
      res.render("register.ejs", { message: message });
    }
    let user = new User({
      name,
      email,
      slug: randomString + "-" + slugify(name, { lower: true }),
    });
    const data = await user.save();
    if (data) {
      response.success = true;
      response.message = "Registered successfully";
      res.redirect("/");
    } else {
      response.message = "Registration failed, please try again ";
      res.status(400).json(response);
    }
  } catch (error) {
    response.errMessage = error.message;
    console.log(error.errMessage, "error");
    response.message = "Registration failed, please try again";
    res.status(400).json(response);
  }
  res.redirect("/");
};

module.exports.home = (req, res) => {
  res.render("home.ejs");
};

module.exports.authGoogle = async (req, res) => {
  const token = req.body.credential;
  let message = null;
  let response = {
    success: false,
    message: "",
  };
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.OAUTH_DEV_ID,
  });
  const data = ticket.getPayload();
  const updatedStudent = {
    profile: data.picture,
  };

  try {
    const user = await User.findOneAndUpdate(
      { email: data.email },
      { $set: updatedStudent },
      { new: true }
    );
    if (user) {
      res.redirect("/dashboard");
    } else {
      message = "please register to sign in";
      res.render("signup.ejs", { message: message });
    }
  } catch (err) {
    response.errMessage = error.message;
    console.log(error.errMessage, "error");
    response.message = "Google sign in failed, please try again";
    res.status(400).json(response);
  }
};
