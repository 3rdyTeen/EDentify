import { getUserByEmail, saveUserData } from '@/datas/users/user-data';
import { type TUserLoginSchema, userLoginSchema, userSchema } from '@/datas/users/user-schema';
import { type TUserReadComplete, type TUserWrite } from '@/types/general';
import { generateJWT } from '@/utils/jwt-handler';
import {
  sendBadRequestResponse,
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponseWithCookie,
  sendUnauthorizedResponse,
} from '@/utils/response-handler';
import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-const
    let data: TUserWrite = userSchema.parse(req.body);
    data.password = await bcrypt.hashSync(data.password, 10);

    const emailExist: TUserReadComplete = await getUserByEmail(data.email);

    if (emailExist) return sendBadRequestResponse(res, 'Email already exists.');

    await saveUserData(data);

    return sendSuccessNoDataResponse(res, 'Successfully created user.');
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: TUserLoginSchema = userLoginSchema.parse(req.body);

    const user: TUserReadComplete = await getUserByEmail(email);

    if (!user) return sendUnauthorizedResponse(res, 'Invalid Credentials.');

    if (!bcrypt.compareSync(password, user.password))
      return sendUnauthorizedResponse(res, 'Invalid Credentials.');

    const token: string = generateJWT({ id: user.id }, '30d');

    const responseData = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      status: user.status,
    };

    return sendSuccessResponseWithCookie(res, token, responseData);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return sendSuccessNoDataResponse(res, 'User logged out.');
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};
