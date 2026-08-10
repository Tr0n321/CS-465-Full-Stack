import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTripComponent {
  message = signal('');

  trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: 'reef1.jpg',
    description: ''
  };

  constructor(private tripData: TripData) {}

  addTrip(): void {
    this.tripData.addTrip(this.trip).subscribe({
      next: () => {
        this.message.set('Trip added successfully.');

        this.trip = {
          code: '',
          name: '',
          length: '',
          start: '',
          resort: '',
          perPerson: '',
          image: 'reef1.jpg',
          description: ''
        };
      },
      error: (err) => {
        console.error('Unable to add trip:', err);
        this.message.set('Unable to add trip.');
      }
    });
  }
}