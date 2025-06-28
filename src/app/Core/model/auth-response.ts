import { User } from "./user.js";


export class IAuthResponse {
    token!: string;
    user!: User;
  }