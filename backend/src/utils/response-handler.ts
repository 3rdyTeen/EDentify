import { type Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

// Success response with data
export const sendSuccessResponse = <T>(
  res: Response,
  message = 'Operation successful',
  data: T,
  status = 200
): Response<SuccessResponse<T>> => {
  return res.status(status).json({ success: true, message, data });
};

// Success response with data and cookie (e.g., for login/ signup)
export const sendSuccessResponseWithCookie = <T>(
  res: Response,
  token: string,
  data: T,
  status = 200
): Response<SuccessResponse<T>> => {
  const oneDay: number = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'strict',
    httpOnly: true,
  });
  return res.status(status).json({ success: true, data });
};

// Success response without data (e.g., for delete operations)
export const sendSuccessNoDataResponse = (
  res: Response,
  message = 'Operation successful',
  status = 200
): Response<SuccessResponse<null>> => {
  return res.status(status).json({ success: true, message });
};

// Error response
export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status = 500
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Not Found response
export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status = 404
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Validation Error response
export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status = 400
): Response<ErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors,
    },
  });
};

// Unauthorized response
export const sendUnauthorizedResponse = <T>(
  res: Response,
  message = 'Unauthorized',
  status = 401
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Forbidden response
export const sendForbiddenResponse = <T>(
  res: Response,
  message = 'Forbidden',
  status = 403
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Bad Request response
export const sendBadRequestResponse = <T>(
  res: Response,
  message: T,
  status = 400
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};
