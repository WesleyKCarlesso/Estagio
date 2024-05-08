import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Job } from "../models/job.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JobService {
  private apiUrl = "https://api.example.com/jobs";

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http
      .get<Job[]>(this.apiUrl)
      .pipe(map((jobs) => jobs.map((job) => this.transformJob(job))));
  }

  private transformJob(job: Job): any {
    return {
      fullName: job.name,
      fullDescription: `${job.description} Duration: ${job.duration} mins`,
      ...job,
    };
  }
}
