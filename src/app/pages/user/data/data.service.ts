import { Injectable } from '@angular/core';
import { PaginatedData } from '../../../types/paginated-data.type';
import { catchError, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginationFilters } from '../../../types/pagination-filters.type';
import { UserApiService } from '../api/api.service';
import { of, throwError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private api: UserApiService) {}

  async getMany(filters: PaginationFilters): Promise<PaginatedData<any>> {
    return firstValueFrom(this.api.getMany(filters).pipe(
      timeout(5000),
      catchError((err) => {
        console.error('error fetching data: ', err);
        return throwError(err);
      })
    ));
  }

  async create(data: any): Promise<any> {
    console.log('creating data: ', data);
    return firstValueFrom(this.api.create(data).pipe(
      timeout(5000),
      catchError((err) => {
        console.error('error creating data: ', err);
        return throwError(err);
      })
    ));
  }
}
