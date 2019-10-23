import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sector} from "../main/employees/model/sector";
import {environment} from "../../environments/environment";

@Injectable()
export class SectorService {

  private readonly url: string = environment.url;

  constructor(private http: HttpClient) {
  }

  requestSector(id: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.url}sectors/${id}`);
  }

  requestSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.url}sectors/all`);
  }

  postSector(sector: Sector): Observable<Sector> {
    return this.http.post<Sector>(`${this.url}sectors/`, sector);
  }

  updateSector(sector: Sector): Observable<Sector> {
    return this.http.put<Sector>(`${this.url}sectors/`, sector);
  }
}
