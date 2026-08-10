import { Component, OnInit, signal } from '@angular/core';
import { TripCardComponent } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {
  trips = signal<any[]>([]);

  constructor(private tripData: TripData) {}

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (data) => {
        this.trips.set(data);
      },
      error: (err) => {
        console.error('Unable to retrieve trips:', err);
      }
    });
  }
}