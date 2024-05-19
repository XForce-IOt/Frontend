import { Component } from '@angular/core';
import {Clinic} from "../../models/clinic.model";
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import {ClinicService} from "../../services/clinic.service";
import {Veterinarian} from "../../models/veterinarian.model";
import {VeterinarianService} from "../../services/veterinarian.service";
import { GeocodeService } from "../../services/geocode.service";

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface MarkerOptions {
  position: LatLngLiteral;
  title: string;
}

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent {
  searchText: any;
  public clinics: Clinic[];
  public veterinariansByClinic: Veterinarian[];
  public center: LatLngLiteral = {lat: -12.046374, lng: -77.042793}; // Ejemplo: Coordenadas de Lima, Perú
  public zoom = 12;
  public markers: MarkerOptions[] = []; // Array para marcadores
  private subscriptions: Subscription = new Subscription();

  constructor(
    public clinicService: ClinicService,
    public veterinarianService: VeterinarianService,
    public geocodeService: GeocodeService
  ) {
    this.clinics = [];
    this.veterinariansByClinic = [];
  }

  private getClinics(): void{
    this.clinicService.getAll().subscribe((response: any) => {
      this.clinics = response;
      this.updateMarkers();
    })
  }

  private updateMarkers(): void {
    this.clinics.forEach(clinic => {
      if (clinic.address) {
        const sub = this.geocodeService.getCoordinates(clinic.address).subscribe({
          next: coords => {
            if (coords) {
              this.markers.push({
                position: coords,
                title: clinic.name || 'Nombre no disponible'  // Proporciona un nombre por defecto
              });
            }
          },
          error: error => {
            console.error('Geocoding failed for address:', clinic.address, error);
          }
        });
        this.subscriptions.add(sub);
      }
    });
  }

  private getVeterinariansByClinic(clinicId: number){
    this.veterinarianService.getAll().subscribe((response: any) => {
      this.veterinariansByClinic = response.filter((veterinarian: any) => veterinarian.clinicId === clinicId);
    },
      (error: any) => {
        console.error('Error fetching veterinarians by Id:', error);
      }
      );
  }

  onSelected(clinicId: number){
    this.getVeterinariansByClinic(clinicId);
  }

  ngOnInit(): void{
    this.getClinics();
  }

}
