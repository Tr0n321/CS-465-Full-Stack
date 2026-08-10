import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-trip.html',
  styleUrl: './delete-trip.css'
})
export class DeleteTripComponent {
  tripCode = '';
  message = '';

  constructor(private tripData: TripData) {}

  deleteTrip(): void {
    if (!this.tripCode.trim()) {
      this.message = 'Please enter a trip code.';
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete trip ${this.tripCode}?`
    );

    if (!confirmed) {
      return;
    }

    this.tripData.deleteTrip(this.tripCode).subscribe({
      next: () => {
        this.message = `Trip ${this.tripCode} deleted successfully.`;
        this.tripCode = '';
      },
      error: (err) => {
        console.error('Unable to delete trip:', err);
        this.message = 'Unable to delete trip. Check the trip code.';
      }
    });
  }
}