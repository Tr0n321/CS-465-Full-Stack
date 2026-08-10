import { Component, input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  trip = input.required<any>();
}