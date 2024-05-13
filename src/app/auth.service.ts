import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'auth_token';
  private userDataKey = 'user_data';
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const formData = { email, password };
    console.log(formData);
    const url = `http://127.0.0.1:8000/api/login`;
    return this.http.post(url, formData).pipe(
      tap((response:any) =>{
        if (response && response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.setToken(response.data.token);
          this.setUserData(response.data);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  private setUserData(userData: any): void {
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
    localStorage.setItem('id_usuario', userData.id_usuario);
    localStorage.setItem('id_departamento', userData.id_departamento);
  }

  getToken(): string | null {
   // console.log("auth_token"+localStorage.getItem(this.authTokenKey));
    return localStorage.getItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getUserData(): any | null {
    const userDataString = localStorage.getItem(this.userDataKey);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userDataKey);
    localStorage.removeItem('token');
  }
}
