import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../main/dashboard/model/order";
import {RequestOrder} from "../main/dashboard/model/request-order";

@Injectable()
export class OrderService {

  private readonly url: string = environment.url;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}orders/all`);
  }

  submitNewOrder(newOrderForm: RequestOrder): Observable<Order> {
    return this.http.post<Order>(`${this.url}orders/start`, newOrderForm);
  }
}
