module.exports.hello = (req, res) => {
    console.log("hello")
    res.render('index.ejs')
};
