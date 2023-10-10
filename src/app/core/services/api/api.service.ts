import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders | null = null;
  options: any;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }
  private getHeader() {
    var token = this.authService.currentUserToken()
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    this.options = {
      headers: this.headers,
    };
  }
  private getHeaderFileUpload() {
    var token = this.authService.currentUserToken()
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'mime-Type': 'multipart/form-data; boundary=WebKitFormBoundary3WF7X46J5BSBUwfl'
    });
    this.options = {
      headers: this.headers,
    };

  }
  get(apiEndPoint: string): Observable<any> {
    this.getHeader();
    return this.http.get(environment.apiUrl + apiEndPoint, {headers:this.options.headers, observe: 'response'} ).pipe( catchError(async (error) => this.handleError(error)));
  }

  getOnlyJson(apiEndPoint: string): Observable<any> {
    this.getHeader();
    return this.http.get(environment.apiUrl + apiEndPoint, this.options ).pipe( catchError(async (error) => this.handleError(error)));
  }


  getWithCustomHeader(apiEndPoint: string, headers: HttpHeaders): Observable<any> {
    var options = {
      headers: headers,
    };
    return this.http.get(environment.apiUrl + apiEndPoint, options).pipe( catchError(async (error) => this.handleError(error)));
  }

  post(apiEndPoint: string, param: any): Observable<any> {
    let body = param;
    this.getHeader();
    return this.http.post(environment.apiUrl + apiEndPoint, body, this.options).pipe(catchError(async (error) => this.handleError(error)));
  }
  postUploadFile(apiEndPoint: string, param: any): Observable<any> {
    let body = param;
    this.getHeaderFileUpload();
    return this.http.post(environment.apiUrl + apiEndPoint, body, this.options).pipe(catchError(async (error) => this.handleError(error)));
  }
  put(apiEndPoint: string, param: any): Observable<any> {
    let body = param;
    this.getHeader();
    return this.http.put(environment.apiUrl + apiEndPoint, body, this.options).pipe(catchError(async (error) => this.handleError(error)));
  }
  patch(apiEndPoint: string, param: any): Observable<any> {
    let body = param;
    this.getHeader();
    return this.http.patch(environment.apiUrl + apiEndPoint, body, this.options).pipe(catchError(async (error) => this.handleError(error)));
  }
  delete(apiEndPoint: string): Observable<any> {
    this.getHeader();
    return this.http.delete(environment.apiUrl + apiEndPoint, this.options).pipe(catchError(async (error) => this.handleError(error)));
  }
  getDocData(docId: any) {
    return this.http.get(`https://chart.sandboxjovus.co.in/ga4/htmlreport/v1/gethtmldata?fileName=${docId}`)
  }
  private handleError(error: HttpErrorResponse) {
    if (error?.status == 401) {
      this.authService.isLoggedInSubject.next(false);
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
    return error;
  }

}
