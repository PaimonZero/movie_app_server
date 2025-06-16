const userRouter = require("./userRoutes");
const { notFound, errorHandler } = require("../middlewares/errorHandler");
const movieRoutes = require("./movieRoutes");

const initRoutes = (app) => {
    // page user
    app.use("/user", userRouter);
    // page event
    app.use("/movies", movieRoutes);

    // handle 404
    app.use(notFound);
    app.use(errorHandler);
};

module.exports = initRoutes;
