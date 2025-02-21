import { login, logout, register } from '@/controllers/auth-controller';
import { protectAuth } from '@/middlewares/protect-auth';
import { type Application } from 'express';
const routePath = '/api/auth';

export default function (app: Application) {
  // Acess : Public
  // POST : /api/auth/register
  // Params body : ...data
  app.post(`${routePath}/register`, register);

  // Acess : Public
  // POST : /api/auth/login
  // Params body : ...data
  app.post(`${routePath}/login`, login);

  // Acess : Public
  // POST : /api/auth/logout/{id}
  // Params body : ...data
  app.post(`${routePath}/logout`, protectAuth, logout);
}
