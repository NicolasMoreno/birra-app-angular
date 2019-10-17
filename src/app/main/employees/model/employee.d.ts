import {User} from "./user";
import {Profile} from "./profile";

export interface Employee {
  user: User;
  profile: Profile;
  id: number;

}
