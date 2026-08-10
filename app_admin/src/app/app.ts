import { Component } from '@angular/core';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';
import { DeleteTripComponent } from './delete-trip/delete-trip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AddTripComponent,
    EditTripComponent,
    DeleteTripComponent,
    TripListingComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}