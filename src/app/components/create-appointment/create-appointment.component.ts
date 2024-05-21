import { Component } from '@angular/core';
import {Clinic} from "../../models/clinic.model";
import { Subscription } from 'rxjs';
import {ClinicService} from "../../services/clinic.service";
import {Veterinarian} from "../../models/veterinarian.model";
import {VeterinarianService} from "../../services/veterinarian.service";
import { GeocodeService } from "../../services/geocode.service";
import {Appointment} from "../../models/appointment.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pet} from "../../models/pet.model";
import {PetService} from "../../services/pet.service";
import {AppointmentService} from "../../services/appointment.service";

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

  selectedVeterinarian: Veterinarian | null = null;
  selectedPet: Pet | null = null;

  public clinics: Clinic[];
  public veterinariansByClinic: Veterinarian[];
  public pets: Pet[];

  public center: LatLngLiteral = {lat: -12.046374, lng: -77.042793}; // Ejemplo: Coordenadas de Lima, Perú
  public zoom = 12;
  public markers: MarkerOptions[] = []; // Array para marcadores
  private subscriptions: Subscription = new Subscription();
  public appointmentForm: FormGroup;
  //public formErrors: any = {};

  constructor(
    public clinicService: ClinicService,
    public veterinarianService: VeterinarianService,
    public geocodeService: GeocodeService,
    public petService: PetService,
    public appointmentService: AppointmentService,
    private fb: FormBuilder

  ) {
    this.clinics = [];
    this.veterinariansByClinic = [];
    this.pets = [];

    this.appointmentForm = this.fb.group({
      searchText: [''],
      selectedDate: [new Date(), Validators.required],
      title: [''],
      description: [''],
      vet: ['', Validators.required],
      pet: ['', Validators.required]
    });
  }

  private getClinics(): void{
    this.clinicService.getAll().subscribe((response: any) => {
      this.clinics = response;
      this.updateMarkers();
    })
  }

  private  getPets(): void{
    this.petService.getPets().subscribe(
      (response: any)=>{
      this.pets = response;
    },
      (error: any) => {
        console.error('Error fetching pets:', error);
      }
    );
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

  onPetSelected(event: any): void {
    this.selectedPet = event.value;
    this.appointmentForm.patchValue({ pet: event.value });
  }

  selectVeterinarian(veterinarian: Veterinarian): void {
    this.selectedVeterinarian = veterinarian;
    this.appointmentForm.patchValue({ vet: veterinarian});
  }

  createAppointment(){
    if (this.appointmentForm.valid && this.selectedVeterinarian && this.selectedPet){
      const appointment: Appointment = {
        title: this.appointmentForm.value.title,
        //date: (this.appointmentForm.value.selectedDate.getDate()).toString(),
        date: `${this.appointmentForm.value.selectedDate.getDate()}-${this.appointmentForm.value.selectedDate.getMonth()+1}-${this.appointmentForm.value.selectedDate.getFullYear()}`,
        //hour: (this.appointmentForm.value.selectedDate.getHours()).toString(),
        hour: `${this.appointmentForm.value.selectedDate.getHours()}:${this.appointmentForm.value.selectedDate.getMinutes()}`,
        description: this.appointmentForm.value.description,
        vet: this.appointmentForm.value.vet.id,
        pet: this.appointmentForm.value.pet.id,
      };
      console.log('Appointment Data:', appointment);

      this.appointmentService.create(appointment).subscribe(
        (response: Appointment)=>{
          console.log('Appointment created successfully:', response);
        },
        (error: any) => {
          console.error('Error creating appointment:', error);
        }
      );
    } else console.log('Algo esta mal', this.appointmentForm.valid, this.selectedVeterinarian, this.selectedPet);
  }

  private subscribeToFormChanges(): void {
    this.appointmentForm.valueChanges.subscribe(values => {
      console.log('Form changes:', values);
    });
  }

  ngOnInit(): void{
    this.getClinics();
    this.getPets();
    this.subscribeToFormChanges();
  }

}
