import {User} from "./user";

export class UserModel implements User {
  id: string;
  lastName: string;
  mail: string;
  name: string;
  password: string;
  username: string;

  static from(json: any): UserModel {
    return new UserModel(json.id, json.lastname, json.mail, json.name, json.password, json.username);
  }


  constructor(id: string, lastName: string, mail: string, name: string, password: string, username: string) {
    this.id = id;
    this.lastName = lastName;
    this.mail = mail;
    this.name = name;
    this.password = password;
    this.username = username;
  }
}
