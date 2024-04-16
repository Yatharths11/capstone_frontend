import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import * as z from 'zod';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  hide = true;
  emailError = '';
  username = '';
  email = '';
  password = '';

  usernamerror = '';
  emailerror = '';
  passworderror = '';

  userSchema = z.object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username cannot be longer than 20 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getDetails() {
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // if (!this.username) {
    //   this.usernameerror = 'Username cannot be empty.';
    // }
    // console.log('Username:', this.username);
    // if (!this.password) {
    //   return (this.passworderror = 'Please enter your Password.');
    // } else if (!/[A-Z]/.test(this.password)) {
    //   return (this.passworderror =
    //     'Password must contain at least 1 uppercase letter');
    // } else if (!/[a-z]/.test(this.password)) {
    //   return (this.passworderror =
    //     'Password must contain at least 1 lower letter');
    // } else if (!/\d/.test(this.password)) {
    //   return (this.passworderror = 'Password must contain at least 1 number');
    // } else if (!/[@_]+/.test(this.password)) {
    //   return (this.passworderror =
    //     'Password must contain at least 1 special symbol');
    // } else {
    //   this.usernameerror = '';
    //   this.passworderror = '';
    //   // return {
    //   //   username: this.username,
    //   //   password: this.password,
    //   //   email: this.email,
    //   // };
    // }

    const userdata = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    try {
      let result = this.userSchema.safeParse(userdata);
      if (result.success) {
        return userdata;
      } else {
        const formattererrors = result.error.format();
        this.usernamerror = formattererrors.username?._errors.join(', ') || ' ';
        this.emailerror = formattererrors.email?._errors.join(', ') || ' ';
        this.passworderror =
          formattererrors.password?._errors.join(', ') || ' ';
      }
    } catch (error) {
      console.log(error);
    }
    return {};
  }

  register() {
    const userDetails = this.getDetails();
    console.log('user details: ', userDetails);
    if (!userDetails) {
      // Handle invalid user details
      console.error('Registration failed: Invalid user details');
      return;
    }

    this.http
      .post<any>('http://localhost:8080/users/register', userDetails)
      .subscribe(
        (response) => {
          if (response) {
            console.log('Registration Successful!');
            this.router.navigate(['/login']);
          } else {
            console.error('Registration failed:', response || 'Unknown error');
          }
        },
        (error) => {
          console.error('Error during registration:', error);

          this.openSnackBar(error.error.error, 'Close');
        }
      );
  }
}
