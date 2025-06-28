import { Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ValidationMessageComponent } from '../../Core/validation-message/validation-message.componant';
import { AuthService } from '../../Core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

// import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    ToastModule,
    HttpClientModule
  ],
  providers: [MessageService, AuthService]
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value)
      .subscribe({
        complete: () => {
          this.router.navigate(['tickets']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Failed to Login',
            life: 5000
          });        
        }
      });
  }
}