import { Injectable } from '@angular/core';
import {HttpService} from "../../../../shared/services/http.service";
import {Appointment} from "../model/appointment.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends HttpService<Appointment>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/appointments'
  }
}
