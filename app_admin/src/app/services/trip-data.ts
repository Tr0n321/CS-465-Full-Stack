import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // GET all trips
  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/trips`);
  }

  // GET one trip by code
  getTrip(tripCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  // POST a new trip
  addTrip(trip: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/trips`, trip);
  }

  // PUT an updated trip
  updateTrip(tripCode: string, trip: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}/trips/${tripCode}`,
      trip
    );
  }

  // DELETE a trip
  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiBaseUrl}/trips/${tripCode}`
    );
  }
}