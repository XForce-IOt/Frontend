import { Component, OnInit, ViewChild } from '@angular/core';

import { AppointmentService } from 'src/app/appointment-function/services/appointment.service';
import { PetService } from 'src/app/collar-function/services/pet.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { SensorData } from '../../model/sensor-data.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface MarkerOptions {
  position: LatLngLiteral;
  title: string;
}

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  userId:number | null = null;
  pets: any[] = [];
  appointments: any[] = [];
  filterAppointments: any[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public secondchartOptions: Partial<ChartOptions>;
  public center: LatLngLiteral = {lat: -12.046374, lng: -77.042793};
  public markers: MarkerOptions[] = [];

  constructor(private translate: TranslateService, private PetsService: PetService, private appointmentService: AppointmentService, private authService: AuthService) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
    
    this.chartOptions = {
      series: [
        { name: "Temperature",
          data: [] }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false}
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: {
        text: "Temperature",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: { categories: [] }
    };

    this.secondchartOptions = {
      series: [
        { name: "Beats per minute",
          data: [] }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: {
        text: "Frecuencia cardiaca",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: { categories: [] }
    };
  }


  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getPets();
    //this.getNextAppointments();
    //this.prepareChartData(this.pets);
  }

  getPets(): void {
    this.PetsService.getPets(this.userId).subscribe(
      (pets) => {
        this.pets = pets;
        console.log(this.pets);
        if(this.pets.length > 0){
          this.prepareChartData(this.pets[0])
        }
      }
    );
  }

  getNextAppointments(petId:any) {
    const ahora = new Date();
    this.appointmentService.getAppointmentsByPetId(this.userId,petId).subscribe(
      (data) => {
        this.appointments = data;
        this.appointments.forEach(appointment => {
          const [day, month, year] = appointment.date.split('-');
          const [hour, minute] = appointment.hour.split(':');
          // Crear una nueva fecha con el formato adecuado
          const fechaCita = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
          if (fechaCita > ahora) {
            this.filterAppointments.push(appointment);
          }
        });
        console.log(this.filterAppointments);
      }
    );
  }
  checkAppointments(petId: number): boolean {
    return this.filterAppointments.some(appointment => appointment.pet === petId);
  }

  prepareChartData(pets: any): void {
    this.PetsService.getPetMetrics(pets.id).subscribe((metrics: SensorData[]) =>{
      const temperatureSeries = metrics.map(m => m.temperature);
      const categories1 = metrics.map(m => new Date(m.createdAt).toLocaleDateString());

      const heartRateSeries = metrics.map(m => m.pulse);
      const categories2 = metrics.map(m => new Date(m.createdAt).toLocaleDateString());

      this.chartOptions.series = [{ name: "Temperature (°)", data: temperatureSeries }];
      this.chartOptions.xaxis!.categories = categories1;

      this.secondchartOptions.series = [{ name: "Beats per minute", data: heartRateSeries }];
      this.secondchartOptions.xaxis!.categories = categories2;
    })
    /*//Datos para el grafico de peso (primer gráfico)
    const weightSeries = pets.weight;
    const categories1 = pets.categories1;

    //Datos para el gráfico de frecuencia cardíaca (segundo gráfico)
    const beatsPerMinuteSeries = pets.beatsPerMinute;
    const categories2 = pets.categories2;


    //Configuración para el primer gráfico (peso)
    this.chartOptions.series = [{ name: "Weight (kg)", data: weightSeries }];
    this.chartOptions.xaxis!.categories = categories1;

    //Configuración para el segundo gráfico (frecuencia cardíaca)
    this.secondchartOptions.series = [{ name: "Beats per minute", data: beatsPerMinuteSeries }];
    this.secondchartOptions.xaxis!.categories = categories2;*/
  }

  onTabChange(event: any): void {
    const selectedIndex = event.index;
    if (this.pets[selectedIndex]) {
      this.prepareChartData(this.pets[selectedIndex]);
    }
  }

}
