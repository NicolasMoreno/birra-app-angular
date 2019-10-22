import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sector} from "../main/employees/model/sector";

@Injectable()
export class SectorService {

  constructor(private http: HttpClient) {
  }

  requestSector(id: number): Observable<Sector> {
    return this.http.get<Sector>(`sectors/${id}`);
  }

  requestSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`sectors/all`);
  }

  postSector(sector: Sector): Observable<Sector> {
    return this.http.post<Sector>(`sectors/`, sector);
  }

  updateSector(sector: Sector): Observable<Sector> {
    return this.http.put<Sector>(`sectors/`, sector);
  }
}
