import { Injectable } from '@angular/core';
import { DataService } from '../../../modules/data-service/data.service';
import { HttpClient } from '@angular/common/http';
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

  async fetchData(filters: PaginationFilters): Promise<PaginatedData<any>> {
    return firstValueFrom(this.api.getMany(filters).pipe(
      timeout(5000),
      catchError((err) => {
        console.error('error fetching data: ', err);
        return throwError(err);
      })
    ));
  }
}
