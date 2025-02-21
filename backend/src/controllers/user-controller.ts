import {
  deleteUserData,
  getAllUsersData,
  getUserData,
  saveUserData,
  updateUserData,
} from '@/datas/users/user-data';
import { userSchema } from '@/datas/users/user-schema';
import { type TUserID, type TUserRead, type TUserWrite } from '@/types/general';
import {
  sendErrorResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
} from '@/utils/response-handler';
import { type Request, type Response } from 'express';

// get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: TUserRead[] | null = await getAllUsersData();
    return sendSuccessResponse(res, users);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// get user
export const getUser = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id as TUserID;
    const user: TUserRead | null = await getUserData(userID);

    return sendSuccessResponse(res, user);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUserWrite = userSchema.parse(req.body);
    const createdUser: TUserRead = await saveUserData(user);

    return sendSuccessResponse(res, createdUser);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData: TUserWrite = userSchema.parse(req.body);
    const userID = req.params.id as TUserID;
    const updatedUser: TUserRead = await updateUserData(userData, userID);

    return sendSuccessResponse(res, updatedUser);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id as TUserID;
    await deleteUserData(userID);

    return sendSuccessNoDataResponse(res, `Successfully delete User ${userID}`);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};
