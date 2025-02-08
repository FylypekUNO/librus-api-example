declare module "librus-api" {
  /**
   * A minimal definition for the parts of the Librus client used in our API.
   */
  export default class Librus {
    authorize(login: string, pass: string): Promise<void>;
    info: {
      getGrades(): Promise<unknown>;
    };
    calendar: {
      getCalendar(month?: number, year?: number): Promise<unknown>;
    };
  }
}
