import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ],
    ],
  });
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get formControls() {
    return this.signupForm.controls;
  }

  signupUser() {
    const { firstName, email, password } = this.signupForm.value;
    const data = { firstName, email, password };
    this.loading = true;
    this.authService.signup(data).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.toast.success(data.message, '', {
          timeOut: 800,
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      },
      error: (error) => {
        this.loading = false;
        this.toast.error(error.error.message);
      },
    });
  }
}
