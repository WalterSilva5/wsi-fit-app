import { Component, OnInit } from '@angular/core';
import { WsiTableComponent } from '../../../components/wsi-table/wsi-table.component';
import { TableColumn } from '../../../components/wsi-table/types/table-column.type';
import { PaginationFilters } from '../../../types/pagination-filters.type';
import { ExerciseDataService } from './data/data.service';
import PaginatedData from '../../../types/paginated-data.type';
import Meta from '../../../types/meta.type';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [WsiTableComponent],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss',
})
export class ExerciseComponent implements OnInit {
  columns: TableColumn[] = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'name' },
    { label: 'Criado', key: 'createdAt' },
  ];

  data: PaginatedData<any> = new PaginatedData();
  meta: Meta = new Meta();

  constructor(public api: ExerciseDataService) {}
  ngOnInit(): void {
    this.fetchData({ search: '' });
  }

  async fetchData(filters: PaginationFilters) {
    const data = await this.api.fetchData(filters);
    console.log('exercise paginated: ', data);
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
