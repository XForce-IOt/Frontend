import { Component } from '@angular/core';
import { Clinic } from '../../model/clinic.model';
import { Subscription } from 'rxjs';
import { ClinicService } from '../../services/clinic.service';
import { Veterinarian } from '../../model/veterinarian.model';
import { VeterinarianService } from '../../services/veterinarian.service';
import { GeocodeService } from "../../../shared/services/geocode.service";
import { Appointment} from "../../model/appointment.model";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Pet} from "../../../collar-function/model/pet.model";
import { PetService} from "../../../collar-function/services/pet.service";
import { AppointmentService} from "../../services/appointment.service";
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  clinicId: any | null = null;
  vetId: any | null = null;
  petOwnerId: any | null = null;

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
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router


  ) {
    this.clinics = [];
    this.veterinariansByClinic = [];
    this.pets = [];
    this.petOwnerId = this.authService.getUserId();

    this.appointmentForm = this.fb.group({
      searchText: [''],
      selectedDate: [new Date(), Validators.required],
      time: [new Date()],
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

  private getPets(): void{
    this.petService.getPets(this.petOwnerId).subscribe(
      (response: any)=>{
      this.pets = response;
      console.log(this.pets)
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
    this.veterinarianService.getAll(clinicId).subscribe((response: any) => {
      console.log(clinicId)
      this.veterinariansByClinic = response.filter((veterinarian: any) => veterinarian.clinicId == clinicId);
      console.log(this.veterinariansByClinic)
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
      const appointment: Appointment = {
        petId: this.appointmentForm.value.pet.id,
        title: this.appointmentForm.value.title,
        //date: (this.appointmentForm.value.selectedDate.getDate()).toString(),
        dateTime: `${this.appointmentForm.value.selectedDate.getDate()}-${this.appointmentForm.value.selectedDate.getMonth()+1}-
        ${this.appointmentForm.value.selectedDate.getFullYear()}  ${this.appointmentForm.value.time.getHours()}:${this.appointmentForm.value.time.getMinutes()}`,
        //hour: (this.appointmentForm.value.selectedDate.getHours()).toString(),
        //hour: `${this.appointmentForm.value.time.getHours()}:${this.appointmentForm.value.time.getMinutes()}`,
        description: this.appointmentForm.value.description,
        initialStatus: "NOT_STARTED",
      };
      console.log('Appointment Data:', appointment);

      this.appointmentService.create(this.clinicId,this.vetId,this.petOwnerId, appointment).subscribe(
        (response: Appointment)=>{
          console.log('Appointment created successfully:', response);
        },
        (error: any) => {
          console.error('Error creating appointment:', error);
        }
      );
      this.router.navigate(['/home/appointment']);
  }

  private subscribeToFormChanges(): void {
    this.appointmentForm.valueChanges.subscribe(values => {
      console.log('Form changes:', values);
    });
  }

  ngOnInit(): void{
    this.clinicId = this.route.snapshot.paramMap.get('clinicId');
    this.vetId = this.route.snapshot.paramMap.get('vetId');
    this.getClinics();
    this.getPets();
    this.subscribeToFormChanges();
  }



}
