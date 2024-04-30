import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CalendarCommonModule, CalendarModule, CalendarView} from "angular-calendar";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css'],
  imports: [
    CalendarModule,
    //CalendarCommonModule
  ],

  standalone: true
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView = CalendarView.Month;

  @Input() viewDate: Date = new Date();

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
