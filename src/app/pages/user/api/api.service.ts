import { Injectable } from '@angular/core';
import { DataService } from '../../../modules/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../../../types/paginated-data.type';
import { catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { PaginationFilters } from '../../../types/pagination-filters.type';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends DataService {
  endpoint = 'user';
  constructor(public override http: HttpClient, public override store: Store<any>) {
    super(http, store);
    this.apiUrl
  }

  getMany(fitlers: PaginationFilters): Observable<PaginatedData<any>> {
    return this.getManyData<PaginatedData<any>>(`${this.endpoint}?${fitlers.search}`)
  }

  create(data: any): Observable<any> {
    console.log('Creating user: ', data);
    return this.postData<any>(data, `${this.endpoint}`);
  }

  delete(id: string): Observable<any> {
    console.log('Deleting user: ', id);
    return this.deleteData(id, `${this.endpoint}`);
  }

  getById(id: string): Observable<any> {
    return this.getOneData<any>(id, `${this.endpoint}`);
  }
}
