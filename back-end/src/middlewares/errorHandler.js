'use strict';

/**
 * Custom application error with an HTTP status code.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Centralised error-handling middleware.
 */
export const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: 'A record with this value already exists' });
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error('[Unhandled Error]', err);
  return res.status(500).json({ message: 'Internal server error' });
};
