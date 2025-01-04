import { Component, OnInit } from '@angular/core';
import { WsiTableComponent } from '../../components/wsi-table/wsi-table.component';
import { TableColumn } from '../../components/wsi-table/types/table-column.type';
import { PaginationFilters } from '../../types/pagination-filters.type';
import { UserDataService } from './data/data.service';
import PaginatedData from '../../types/paginated-data.type';
import Meta from '../../types/meta.type';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [WsiTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  columns: TableColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'firstName' },
    { label: 'Perfil', key: 'role' },
    { label: 'Email', key: 'email' },
  ];

  data: PaginatedData<any> = new PaginatedData();
  meta: Meta = new Meta();

  constructor(private api: UserDataService) {}
  ngOnInit(): void {
    this.fetchData({ search: '' });
  }

  async fetchData(filters: PaginationFilters) {
    const data = await this.api.fetchData(filters);
    console.log('user paginated: ', data);
    this.data = data;
  }

  handleEditClick(event: any) {
    console.log('edit', event);
  }

  handleDeleteClick(event: any) {
    console.log('delete', event);
  }

  handleFilterChange(event: any) {
    console.log('handleFilterChange', event);
  }

  handleRowClick(event: any) {
    console.log('handleRowClick', event);
  }

  handlePageChange(event: any) {
    console.log('handlePageChange', event);
  }
}
