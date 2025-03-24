import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../data/data.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AsyncPipe],
})
export class UserUpdateComponent implements OnInit {
  id: string | null = null;
  userForm: FormGroup;

  constructor(
    private api: UserDataService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      role: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.fetchData(this.id);
      }
    });
  }

  async fetchData(id: string) {
    console.log('USER COMPONENT UPDATE ID: ', id);
    const user = await this.api.getById(id);
    console.log('USER COMPONENT UPDATE USER: ', user);
    this.userForm.patchValue(user);
  }

  async onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      await this.api.updateUser(updatedUser.id, updatedUser);
      console.log('User updated successfully', updatedUser);
    }
  }
}
