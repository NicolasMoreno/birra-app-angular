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

  toEmployeeTable(): {name: string, lastName: string, username: string, profile: string} {
    return {
      name: this.user.name,
      lastName: this.user.lastName,
      username: this.user.username,
      profile: this.profile.name
    };
  }

  constructor(id: number, profile: Profile, user: User) {
    this.id = id;
    this.profile = profile;
    this.user = user;
  }
}
