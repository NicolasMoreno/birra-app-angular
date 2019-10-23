import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Employee} from "../main/employees/model/employee";
import {environment} from "../../environments/environment";

@Injectable()
export class EmployeeService {

  private readonly url: string = environment.url;

  constructor(private http: HttpClient) {
  }

  requestEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}employees/${id}`);
  }

  requestEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}employees/all`);
  }


  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.url}employees/`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}employees/`, employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}employees/${id}`);
  }


}
