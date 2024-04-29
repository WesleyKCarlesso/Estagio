import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserDataService {
    getAllUrl: string = 'https://localhost:7018/api/User/GetAll';
    createUrl: string = 'https://localhost:7018/api/User/Create';

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get(this.getAllUrl);
    }

    post(data: any) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.post(this.createUrl, data, httpOptions);
    }
}
