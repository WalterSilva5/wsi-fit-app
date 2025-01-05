import { Injectable } from '@angular/core';
import { DataService } from '../../../../modules/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../../../../types/paginated-data.type';
import { catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { PaginationFilters } from '../../../../types/pagination-filters.type';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ExerciseApiService extends DataService {
  constructor(public override http: HttpClient, public override store: Store<any>) {
    super(http, store);
  }

  getMany(fitlers: PaginationFilters): Observable<PaginatedData<any>> {
    return this.getData<PaginatedData<any>>(`exercise?${fitlers.search}`)
  }
}
