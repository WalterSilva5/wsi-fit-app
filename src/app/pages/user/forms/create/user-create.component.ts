import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../data/data.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent implements OnInit {
  constructor(private api: UserDataService) {}
  ngOnInit(): void {
    console.log('UserCreateComponent');
  }

}
