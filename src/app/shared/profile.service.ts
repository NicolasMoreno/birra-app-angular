import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../main/employees/model/profile";
import {environment} from "../../environments/environment";

@Injectable()
export class ProfileService {

  private readonly url: string = environment.url;

  constructor(private http: HttpClient) {
  }

  requestProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.url}employee-profile/${id}`);
  }

  requestProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.url}employee-profile/all`);
  }

  postProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.url}employee-profile/`, profile);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.url}employee-profile/`, profile);
  }
}
