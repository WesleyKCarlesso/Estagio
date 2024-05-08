import { Job } from "./job.model";

export class Schedule {
  serviceDate: Date;
  jobId: string;
  job: Job;

  constructor(serviceDate: Date, jobId: string, job: Job) {
    this.serviceDate = serviceDate;
    this.jobId = jobId;
    this.job = job;
  }
}
