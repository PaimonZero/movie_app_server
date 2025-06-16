const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        success: false,
        message: `${err?.name}: ${err?.message}`,
    });
    // Log the error to the console for debugging
    console.error(`${err?.name}: ${err?.message} \n Stack: ${err?.stack}`);
};

module.exports = {
    notFound,
    errorHandler,
};
