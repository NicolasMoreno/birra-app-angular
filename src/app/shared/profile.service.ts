import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../main/employees/model/profile";

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) {
  }


  requestProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`employee-profile/${id}`);
  }

  requestProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`employee-profile/all`);
  }

  postProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`employee-profile/`, profile);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`employee-profile/`, profile);
  }
}
