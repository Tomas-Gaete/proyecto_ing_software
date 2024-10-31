import { Activity, ActivityInstance } from "./Activity";

// Define the schedule for a user
export default interface UserSchedule {
  updated: Date; // Last updated date
  campus: Campus; // Campus name
  clases: Activity[]; // List of all classes
}
export type Campus = "Peñalolén" | "Viña del Mar" | "Vitacura" | "Errázuriz";


// Not needed beyond this point
export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

//maybe needed
export type DaySchedule = {
  day: Day;
  schedule: ActivityInstance[];
};

