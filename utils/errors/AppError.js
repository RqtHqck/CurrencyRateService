class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode || 500;
    this.statusCode = `${this.status}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}