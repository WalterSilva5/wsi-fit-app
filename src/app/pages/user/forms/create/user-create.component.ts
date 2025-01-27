import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../data/data.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe, RouterModule],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private api: UserDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.api
        .create(this.form.value)
        .then((res) => {
          console.log('User created: ', res);
          Swal.fire({
            icon: 'success',
            title: 'User created successfully',
            showConfirmButton: true,
          });
        })
        .catch((err) => {
          console.error('Error creating user: ', err);
          Swal.fire({
            icon: 'error',
            title: 'Error creating user',
            showConfirmButton: true,
          });
        });
    }
  }
}
