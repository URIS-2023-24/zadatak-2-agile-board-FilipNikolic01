import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { response } from "express";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  baseUrl =
    "https://app.microenv.com/backend/key/cd4cffbe988ba80448a319/rest/api/tasks/";

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http
      .get(this.getUrl())
      .pipe(map((response: Response) => response));
  }

  private getUrl() {
    return `${this.baseUrl}`;
  }
}
