const testRouter = require("./test");
const loginRouter = require("./loginRouter");

const initRoutes = (app) => {
    app.use("/", testRouter);
    app.use("/auth" , loginRouter);
}    

module.exports = initRoutes;