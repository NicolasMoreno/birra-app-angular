import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from "../main/supplies/model/stock";
import {environment} from "../../environments/environment";

export class StockService {

  private readonly url: string = environment.url;


  constructor(private http: HttpClient) {}

  requestStock(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.url}stock/${id}`);
  }

  requestStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.url}stock/all`);
  }

  postStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.url}stock/`, stock);
  }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.url}stock/`, stock);
  }
}
