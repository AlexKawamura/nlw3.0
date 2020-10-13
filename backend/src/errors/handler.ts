import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorhandler: ErrorRequestHandler = ( error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(404).json({ message: 'Validation fails', errors });
  }
  console.error(error);

  return response.status(500).json({ message: 'Internal server error' });
}

export default errorhandler;