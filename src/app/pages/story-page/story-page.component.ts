import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrl: './story-page.component.css'
})
export class StoryPageComponent {
  constructor(private http: HttpClient) {
    this.isAuthTokenPresent();
  }
  
  private readonly TOKEN_KEY = 'my_app_token';


  isAuthTokenPresent(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout():void {
    localStorage.removeItem('my_app_token');
    console.log(this.TOKEN_KEY)
  }
}
