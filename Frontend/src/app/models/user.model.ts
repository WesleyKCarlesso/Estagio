import { Schedule } from "./schedule.model";

export enum EnumSex {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export class User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  sex: EnumSex;
  phone: string;
  schedules: Schedule[];

  constructor(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    sex: EnumSex,
    phone: string,
    schedules: Schedule[],
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.sex = sex;
    this.phone = phone;
    this.schedules = schedules;
  }
}
