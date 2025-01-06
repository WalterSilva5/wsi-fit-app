import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../data/data.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
})
export class UserUpdateComponent implements OnInit {
  constructor(private api: UserDataService) {}
  ngOnInit(): void {
  }

  async fetchData() {
  }
}
