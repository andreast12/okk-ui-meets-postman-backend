const notFound = (req, res, next) => {
  const error = new Error(`URL tidak ditemukan`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Set default status code dan message
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name == "ValidationError") {
    statusCode = 400;
    message = "Harap memberikan data dengan lengkap dan benar";
  }

  if (err.name === "CastError") {
    statusCode = 404;
    if (err.kind === "ObjectId") message = "ID tidak valid";
    else if (err.kind === "Number") message = "Nomor tidak valid";
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 400;
    message = `${Object.values(err.keyValue)[0]} sudah ada`;
  }

  if (err.name === "BPHCountError") statusCode = 400;

  res.status(statusCode).json({ message });
};

export { notFound, errorHandler };
