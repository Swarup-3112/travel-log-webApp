const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

module.exports.register = (req, res) => {
    console.log("hello")
    res.render('signup.ejs')
};

module.exports.authGoogle = async (req, res) => {
    // console.log(req.body.credential , "token")
    const token = req.body.credential
    console.log(token, "token")
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.OAUTH_DEV_ID,
      });
    
      const data = ticket.getPayload()
      console.log(data , "data")
}