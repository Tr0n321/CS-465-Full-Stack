import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent {
  message = signal('');
  loaded = signal(false);

  tripCode = '';

  trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(private tripData: TripData) {}

  loadTrip(): void {
    if (!this.tripCode) {
      this.message.set('Enter a trip code first.');
      return;
    }

    this.tripData.getTrip(this.tripCode).subscribe({
      next: (data) => {
        this.trip = {
          code: data.code ?? '',
          name: data.name ?? '',
          length: data.length ?? '',
          start: data.start ? data.start.substring(0, 10) : '',
          resort: data.resort ?? '',
          perPerson: data.perPerson ?? '',
          image: data.image ?? '',
          description: data.description ?? ''
        };

        this.loaded.set(true);
        this.message.set('Trip loaded successfully.');
      },
      error: (err) => {
        console.error('Unable to load trip:', err);
        this.loaded.set(false);
        this.message.set('Unable to find that trip.');
      }
    });
  }

  updateTrip(): void {
    this.tripData.updateTrip(this.tripCode, this.trip).subscribe({
      next: () => {
        this.message.set('Trip updated successfully.');
      },
      error: (err) => {
        console.error('Unable to update trip:', err);
        this.message.set('Unable to update trip.');
      }
    });
  }
}