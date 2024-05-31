import { Component, OnInit, ViewChild } from '@angular/core';
import { count } from 'rxjs';
import { Appointment } from 'src/app/domain/appointment/entities/appointment.model';
import { AppointmentService } from 'src/app/domain/appointment/services/appointment.service';
import { PetService } from 'src/app/domain/pets/services/pet.service';

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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: any[] = [];
  appointments: any[] = [];
  filterAppointments: any[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public secondchartOptions: Partial<ChartOptions>;

  constructor(private PetsService: PetService, private appointmentService: AppointmentService) {
    this.chartOptions = {
      series: [
        {
          name: "Weight (kg)",
          data: [45, 43, 46, 51, 49, 53, 50, 52, 51]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Peso (kg)",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };

    this.secondchartOptions = {
      series: [
        {
          name: "Beats per minute",
          data: [68, 72, 76, 76, 96, 100, 90, 80, 77]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
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
      xaxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ]
      }
    };
  }


  ngOnInit(): void {
    this.getPets();
    this.getNextAppointments();
    this.prepareChartData(this.pets);
  }

  getPets(): void {
    this.PetsService.getPets().subscribe(
      (pets) => {
        this.pets = pets;
        console.log(this.pets);
      }
    );
  }

  getNextAppointments() {
    const ahora = new Date();
    this.appointmentService.getAll().subscribe(
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

  prepareChartData(pets: any[]): void {
    //Datos para el grafico de peso (primer gráfico)
    const weightSeries = pets.map(pet => pet.weight);
    const categories1 = pets.map(pet => pet.categories1);

    //Datos para el gráfico de frecuencia cardíaca (segundo gráfico)
    const beatsPerMinuteSeries = pets[0].beatsPerMinute;
    const categories2 = pets[0].categories2;


    //Configuración para el primer gráfico (peso)
    this.chartOptions.series = [{ name: "Weight (kg)", data: weightSeries }];
    this.chartOptions.xaxis!.categories = categories1;

    //Configuración para el segundo gráfico (frecuencia cardíaca)
    this.secondchartOptions.series = [{ name: "Beats per minute", data: beatsPerMinuteSeries }];
    this.secondchartOptions.xaxis!.categories = categories2;
  }

}
