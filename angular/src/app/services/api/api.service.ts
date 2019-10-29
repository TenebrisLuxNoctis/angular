import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/models/message';

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

  public async POST<T>(url: string, obj: T) {
    return await this.http.post<Message>(this.baseURL + url, obj).toPromise();
  }

  public async DELETE(url: string) {
    return await this.http.delete<Message>(this.baseURL + url).toPromise();
  }
}
