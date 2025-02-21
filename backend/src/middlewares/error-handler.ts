import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendValidationError,
} from '@/utils/response-handler';
import { Prisma } from '@prisma/client';
import { type Request, type Response } from 'express';
import { z } from 'zod';

export default function (error: Error, request: Request, response: Response) {
  // Log the error stack for debugging purposes

  /*

   REPLACE IT WITH WINSTON
    console.error(error.stack);
  */

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors = error.errors.map((e: any) => e.message) as string[];
    return sendValidationError(response, 'Validation Error', errors);
  }

  // Handle known Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const res =
      process.env.NODE_ENV == 'developement'
        ? { error: 'Prisma Error occurred', details: error }
        : { error: 'Error occurred' };

    return sendBadRequestResponse(response, res);
  }

  // Handle Json Web Token Error
  // if (error instanceof JsonWebTokenError) {
  //   const res =
  //     process.env.APP_ENV == 'developement'
  //       ? { error: 'Json Web Token Error occurred', message: error }
  //       : { error: 'Error occurred' };
  //   return sendBadRequestResponse(response, res);
  // }

  // Handle other types of errors
  const res =
    process.env.APP_ENV == 'developement'
      ? { message: error.message }
      : { message: 'Internal Server Error' };
  return sendErrorResponse(response, res);
}
