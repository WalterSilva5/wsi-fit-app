import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../data/data.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
  ],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private api: UserDataService) {}

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
      console.log('Form values:', this.form.value);
    }
  }
}
