import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Employee} from "../main/employees/model/employee";

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  requestEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`employees/${id}`);
  }

  requestEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`employees/all`);
  }


  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`employees/`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`employees/`, employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`employees/${id}`);
  }


}
