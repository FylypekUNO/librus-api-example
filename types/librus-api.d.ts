declare module "librus-api" {
  type Grades = {
    name: string;
    semester: {
      grades: [
        {
          id: number;
          info: string;
          value: string;
        }
      ];
      tempAverage: number?;
      average: number?;
    }[];
    tempAverage: number?;
    average: number?;
  }[];

  /**
   * A minimal definition for the parts of the Librus client used in our API.
   */
  export default class Librus {
    authorize(login: string, pass: string): Promise<void>;
    info: {
      getGrades(): Promise<Grades>;
    };
    calendar: {
      getCalendar(month?: number, year?: number): Promise<unknown>;
      getTimetable(from?: Date, to?: Date): Promise<unknown>;
    };
  }
}
