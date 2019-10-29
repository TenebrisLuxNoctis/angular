import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) {

  }

  public async GET<T>(url: string, params: string = "") {
    return await this.http.get<T>(this.baseURL + url + params).toPromise();
  }
}
