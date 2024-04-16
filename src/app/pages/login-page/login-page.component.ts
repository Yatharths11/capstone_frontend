import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  hide = true;
  username: string = ''; // Initialize username to an empty string
  password: string = ''; // Initialize password to an empty string

  private readonly TOKEN_KEY = 'my_app_token';


  constructor(private http: HttpClient, private router: Router) {}

  usernameerror = '';
  passworderror = '';

  getDetails() {
    // Access username and password values using this.username and this.password
    if (!this.username) {
      this.usernameerror = 'Username cannot be empty.';
    }
    console.log('Username:', this.username);
    if (!this.password) {
      return (this.passworderror = 'Please enter your Password.');
    } else if (!/[A-Z]/.test(this.password)) {
      return (this.passworderror =
        'Password must contain at least 1 uppercase letter');
    } else if (!/[a-z]/.test(this.password)) {
      return (this.passworderror =
        'Password must contain at least 1 lower letter');
    } else if (!/\d/.test(this.password)) {
      return (this.passworderror = 'Password must contain at least 1 number');
    } else if (!/[@_]+/.test(this.password)) {
      return (this.passworderror =
        'Password must contain at least 1 special symbol');
    } else {
      console.log('Password:', this.password);
      this.usernameerror = '';
      this.passworderror = '';
      return { username: this.username, password: this.password };
    }
    // Implement your login logic here using the username and password
    // For example, send a login request to your backend API

    // Clear the form after submission (optional)
    this.username = '';
    this.password = '';
  }

  performLogin() {
    this.http.post('http://localhost:8080/auth/login', this.getDetails())
      .subscribe((response: any) => {
        if (response.token) {
          console.log('Token : ', response.token);
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.router.navigate(['/home']);
        }
      });
  }
}
