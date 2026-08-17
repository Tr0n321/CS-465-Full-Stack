import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // GET all trips
  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiBaseUrl}/trips`
    );
  }

  // GET one trip by code
  getTrip(tripCode: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}/trips/${tripCode}`
    );
  }

  // POST a new trip
  addTrip(trip: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseUrl}/trips`,
      trip
    );
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

  // Login
  login(
    user: User,
    password: string
  ): Observable<AuthResponse> {
    return this.handleAuthAPICall(
      'login',
      user,
      password
    );
  }

  // Register
  register(
    user: User,
    password: string
  ): Observable<AuthResponse> {
    return this.handleAuthAPICall(
      'register',
      user,
      password
    );
  }

  // Shared authentication request
  private handleAuthAPICall(
    endpoint: string,
    user: User,
    password: string
  ): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: password
    };

    return this.http.post<AuthResponse>(
      `${this.apiBaseUrl}/${endpoint}`,
      formData
    );
  }
}