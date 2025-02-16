import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../data/data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
  imports: [CommonModule],
})
export class UserUpdateComponent implements OnInit {
  id: string | null = null;
  user: any;
  constructor(private api: UserDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.fetchData(this.id);
      }
    });
  }

  async fetchData(id: string) {
    console.log("USER COMPONENT UPDATE ID: ", id)
    const user = await this.api.getById(id);
    console.log("USER COMPONENT UPDATE USER: ", user)
    this.user = JSON.stringify(user);
  }
}
