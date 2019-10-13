import {User} from "./user";

export class UserModel implements User {

  static from(json: any): UserModel {
    return new UserModel();
  }
  constructor() {}

}
