import { Injectable } from '@angular/core';
import { interval, Observable, of, pipe} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CallerService {

  constructor(private http: HttpClient) { }

  get(urlApi:string) : Observable<any> {
    return this.http.get<any>(urlApi)
  }
  post(urlApi:string, object:any) : Observable<any> {
    return this.http.post<any>(urlApi,object
      , { headers: new HttpHeaders({'Content-type': 'application/json '})}
      )
  }
}
