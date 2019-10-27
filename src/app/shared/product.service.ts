import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Product} from "../main/products/model/product";
import {RequestOrder} from "../main/dashboard/model/request-order";

@Injectable()
export class ProductService {

  private readonly url: string = environment.url;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}products/all`);
  }

  checkProductAvailability(request: RequestOrder): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}products/check`, request);
  }
}
