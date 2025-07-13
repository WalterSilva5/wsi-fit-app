import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { selectAuth } from '../../state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl = environment.apiUrl;
  REQUEST_TIMEOUT = 3000000;
  token = '';

  constructor(public http: HttpClient, public store: Store<any>, private router: Router) {
    this.store.select(selectAuth).subscribe((auth) => {
      this.token = auth?.accessToken || '';
    });
  }

  protected getHeaders(authenticated: boolean = true): HttpHeaders {
    let headers = new HttpHeaders();
    if (authenticated && this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  public getManyData<T>(endpoint?: string, authenticated: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = this.getHeaders(authenticated);
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => this.handleError(error, () => this.getManyData(endpoint, authenticated)))
    );
  }

  public getOneData<T>(id: string, endpoint?: string, authenticated: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint, id);
    const headers = this.getHeaders(authenticated);
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => this.handleError(error, () => this.getOneData(id, endpoint, authenticated)))
    );
  }

  public postData<T>(data: T, endpoint?: string, authenticated: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = this.getHeaders(authenticated);
    return this.http.post<any>(url, data, { headers }).pipe(
      catchError((error) => this.handleError(error, () => this.postData(data, endpoint, authenticated)))
    );
  }

  public updateData<T>(data: T, id: string, endpoint?: string, authenticated: boolean = true): Observable<T> {
    const url = this.buildUrl(endpoint, id);
    const headers = this.getHeaders(authenticated);
    return this.http.put<T>(url, data, { headers }).pipe(
      catchError((error) => this.handleError(error, () => this.updateData(data, id, endpoint, authenticated)))
    );
  }

  public deleteData(id: string, endpoint?: string, authenticated: boolean = true): Observable<Object | undefined> {
    const url = this.buildUrl(endpoint, id);
    const headers = this.getHeaders(authenticated);
    return this.http.delete(url, { headers }).pipe(
      catchError((error) => this.handleError(error, () => this.deleteData(id, endpoint, authenticated)))
    );
  }

  /**
   * Método para tentar fazer refresh do token. Deve ser sobrescrito nos serviços filhos se necessário.
   */
  protected refreshToken(): Observable<boolean> {
    // Por padrão, retorna erro. Serviços filhos podem sobrescrever.
    return throwError('Refresh token não implementado.');
  }

  /**
   * Tratamento centralizado de erros, incluindo tentativa de refresh em caso de 401.
   */
  public handleError(error: any, retryCallback?: () => Observable<any>): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 && retryCallback) {
        return this.tryRefreshAndRetry(retryCallback);
      }
      const errorMessage = this.buildErrorMessage(error);
      this.logError(errorMessage, error);
      return throwError(errorMessage);
    }
    return throwError(error);
  }

  /**
   * Trata erros de timeout e rede.
   */
  public handleTimeoutError(error: any): Observable<any> {
    if (this.isNetworkError(error)) {
      return of({ success: true, message: 'Upload concluído com sucesso!' });
    }
    if (this.isTimeoutError(error)) {
      console.warn('Timeout or unknown error ignored');
      return of({ success: true, message: 'Request completed successfully' });
    }
    this.logError('Erro desconhecido de timeout/rede', error);
    return throwError(error);
  }

  /**
   * Monta a URL base para as requisições.
   */
  private buildUrl(endpoint?: string, id?: string): string {
    let url = `${this.apiUrl}`;
    if (endpoint) url += `/${endpoint}`;
    if (id) url += `/${id}`;
    return url;
  }

  /**
   * Monta a mensagem de erro amigável.
   */
  private buildErrorMessage(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
      return `Erro: ${error.error.message}`;
    }
    return `Código do erro: ${error.status}\nMensagem: ${error.message}`;
  }

  /**
   * Tenta fazer refresh do token e refazer a requisição original.
   */
  private tryRefreshAndRetry(retryCallback: () => Observable<any>): Observable<any> {
    return this.refreshToken().pipe(
      switchMap((success) => {
        if (success) {
          return retryCallback();
        } else {
          this.router.navigate(['/auth/login']);
          return throwError('Não autenticado.');
        }
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return throwError('Erro ao renovar autenticação.');
      })
    );
  }

  /**
   * Verifica se o erro é de rede.
   */
  private isNetworkError(error: any): boolean {
    return error && error.message === 'Network Error';
  }

  /**
   * Verifica se o erro é timeout (504 ou 0).
   */
  private isTimeoutError(error: any): boolean {
    return (
      error instanceof HttpErrorResponse &&
      (error.status === 504 || error.status === 0)
    );
  }

  /**
   * Loga o erro no console.
   */
  private logError(message: string, error?: any): void {
    console.error(message);
    if (error) {
      console.error(error);
    }
  }
}
