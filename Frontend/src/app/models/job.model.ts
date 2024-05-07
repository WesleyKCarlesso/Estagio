export class Job {
  name: string;
  description: string;
  duration: number; // minutes
  intervalDuration: number;
  startInterval: number;

  constructor(
    name: string,
    description: string,
    duration: number,
    intervalDuration: number,
    startInterval: number,
  ) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.intervalDuration = intervalDuration;
    this.startInterval = startInterval;
  }

  get durationString(): string {
    const durationTimeSpan = this.convertMinutesToTimeSpan(this.duration);
    return `${durationTimeSpan.hours}:${durationTimeSpan.minutes}:${durationTimeSpan.seconds}`;
  }

  private convertMinutesToTimeSpan(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: mins.toString().padStart(2, "0"),
      seconds: "00",
    };
  }
}
