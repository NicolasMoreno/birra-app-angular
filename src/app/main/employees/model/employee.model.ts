import {Employee} from "./employee";
import {User} from "./user";
import {Profile} from "./profile";

export class EmployeeModel implements Employee {

  id: number;
  profile: Profile;
  user: User;

  static from(json: any): EmployeeModel {
    return new EmployeeModel(json.id, json.profile, json.user);
  }

  static empty(): EmployeeModel {
    return new EmployeeModel(undefined, undefined, undefined);
  }

  constructor(id: number, profile: Profile, user: User) {
    this.id = id;
    this.profile = profile;
    this.user = user;
  }

  setUser(userId: string, userData: User) {
    this.user = userData;
    this.user.id = userId;
  }
}
