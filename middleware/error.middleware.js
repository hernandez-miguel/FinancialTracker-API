const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  
  console.error(err);

  res.status(statusCode)
    .json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

module.exports = errorMiddleware;
