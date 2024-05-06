import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserDataService {
    module: string = 'https://localhost:7018/api/User/';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.module + 'GetAll');
    }

    create(data: any) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.post(this.module + 'Create', data, httpOptions);
    }

    authenticate(data: any) {
      return this.http.post(this.module + 'Authenticate', data);
    }

    update(data: any) {
      return this.http.put(this.module + 'Update', data)
    }
}
