export class Appointment {
  id: number;
  title: string;
  date: string;
  hour: string;
  description: string;

  constructor() {
    this.id = 0;
    this.title = 'none';
    this.date = '01-01-2000';
    this.hour = '00:00';
    this.description = 'none';
  }
}
