import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { selectAuth } from '../../state/auth/auth.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl = environment.apiUrl;
  REQUEST_TIMEOUT = 3000000;
  token = '';

  constructor(public http: HttpClient, public store: Store<any>) {
    this.store.select(selectAuth).subscribe((auth) => {
      this.token = auth?.accessToken || '';
    });
  }

  public getManyData<T>(endpoint?: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    try {
      return this.http
        .get<any>(`${url}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public getOneData<T>(id: string, endpoint?: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    try {
      return this.http
        .get<any>(`${url}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public postData<T>(data: T, endpoint?: string,): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    try {
      return this.http
        .post<any>(url, data, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public updateData<T>(data: T, id: string, endpoint?: string,): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    try {
      return this.http
        .put<T>(url, data, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public deleteData(id: string, endpoint?: string): Observable<Object | undefined> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    try {
      return this.http.delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public handleError(error: any): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error?.error) {
      errorMessage = `Erro: ${(error as any).error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    console.error(error);
    return throwError(errorMessage);
  }

  handleTimeoutError(error: any): Observable<any> {
    if (error.message === 'Network Error') {
      return of({
        success: true,
        message: 'Upload concluído com sucesso!',
      });
    }
    if (
      error instanceof HttpErrorResponse &&
      (error.status === 504 || error.status === 0)
    ) {
      console.warn('Timeout or unknown error ignored');
      return of({
        success: true,
        message: 'Request completed successfully',
      });
    }
    console.error('Error occurred:', error);
    return throwError(error);
  }
}
