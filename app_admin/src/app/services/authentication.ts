import { Inject, Injectable } from '@angular/core';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripData: TripData
  ) {}

  public getToken(): string {
    const token = this.storage.getItem('travlr-token');

    if (!token) {
      return '';
    }

    return token;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public getCurrentUser(): User {
    const token = this.getToken();

    const { email, name } = JSON.parse(
      atob(token.split('.')[1])
    );

    return {
      email,
      name
    } as User;
  }

  public login(user: User, password: string): void {
    this.tripData.login(user, password)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Login error:', error);
        }
      });
  }

  public register(user: User, password: string): void {
    this.tripData.register(user, password)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Registration error:', error);
        }
      });
  }
}