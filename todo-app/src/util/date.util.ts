import { startOfDay } from "date-fns";

export class DateUtils {
  public static isDateInFuture(date: Date): boolean {
    const today = new Date();
    return startOfDay(today) < startOfDay(new Date(date));
  }
}
