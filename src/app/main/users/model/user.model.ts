import {User} from "./user";

export class UserModel implements User {
  id: number;
  lastName: string;
  mail: string;
  name: string;
  password: string;
  username: string;

  static from(json: any): UserModel {
    return new UserModel();
  }
  constructor() {}

}
