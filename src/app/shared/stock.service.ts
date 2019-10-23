import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from "../main/supplies/model/stock";

export class StockService {


  constructor(private http: HttpClient) {

  }

  requestStock(id: number): Observable<Stock> {
    return this.http.get<Stock>(`stock/${id}`);
  }

  requestStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`stock/all`);
  }

  postStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`stock/`, stock);
  }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`stock/`, stock);
  }
}
