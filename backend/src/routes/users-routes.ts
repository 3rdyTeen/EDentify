import { type Application } from 'express';

/** Controllers */
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '@/controllers/user-controller';
import { protectAuth } from '@/middlewares/protect-auth';

const route = '/api/users';

export default function (app: Application): void {
  // Acess : Public
  // GET : /api/users
  app.get(`${route}`, protectAuth, getUsers);

  // Acess : Public
  // GET : /api/users/{id}
  app.get(`${route}/:id`, protectAuth, getUser);

  // Acess : Public
  // POST : /api/users
  // Params body : ...data
  app.post(`${route}`, protectAuth, createUser);

  // Acess : Public
  // PUT : /api/users/{id}
  // Params body : ...data
  app.put(`${route}/:id`, protectAuth, updateUser);

  // Acess : Public
  // DELETE : /api/users/{id}
  app.delete(`${route}/:id`, protectAuth, deleteUser);
}
