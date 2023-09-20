import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isLoggedInObservale = this.isLoggedInSubject.asObservable();
  register(firstName: any, email: any, password: any) {
    throw new Error('Method not implemented.');
  }
  currentUserData() {
    return localStorage.getItem('currentUserData') || sessionStorage.getItem('currentUserData') || '';
  }
  constructor(private router: Router) {
    this.isLoggedInSubject.next(this.currentUserData() == '' ? null : JSON.parse(this.currentUserData()));
  }

  dataEmiter = new EventEmitter<boolean>();

  currentUserToken() {
    return this.currentUserData() != '' ? JSON.parse(this.currentUserData()).token : '';
  }
  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
}
