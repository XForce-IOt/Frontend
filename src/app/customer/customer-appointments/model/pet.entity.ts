import { Appointment } from "./appointment.entity";

export class Pet {
  id: number;
  name: string;
  specie: string;
  age: string;
  sex: string;
  size: string;
  perimeter: number;
  image: string;
  appointments: Appointment[];

  constructor() {
    this.id = 0;
    this.name = 'none';
    this.specie = 'none';
    this.age = 'none';
    this.sex = 'none';
    this.size = 'none';
    this.perimeter = 0;
    this.image = 'none';
    this.appointments = [];
  }
}