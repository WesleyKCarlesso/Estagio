import { Job } from "./job.model";

export class Schedule {
  serviceDate: Date;
  serviceFinish: Date;
  jobId: string;
  job: Job;

  constructor(serviceDate: Date, serviceFinish: Date, jobId: string, job: Job) {
    this.serviceDate = serviceDate;
    this.jobId = jobId;
    this.job = job;
    this.serviceFinish = serviceFinish;
  }
}
