import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface DialogData {
  email: string;
  name: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  email: string = '';
  name: string = '';
  canClick: boolean = true;
  stories: Array<Object> = [];

  //Getting the token form the local storage
  private readonly TOKEN_KEY = 'my_app_token';

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.isAuthTokenPresent();
    this.getall();
  }
  
  //check for auth token and return a boolean
  isAuthTokenPresent(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  //function for logout
  logout(): void {
    localStorage.removeItem('my_app_token');
    // console.log(this.TOKEN_KEY);
  }

  disableButton() {
    this.canClick = false;
  }

  //function to get all the stories from the database
  getall() {
    this.http.get<any>('http://localhost:8080/story/all').subscribe(
      (data) => {
        // console.log('Data received');
        console.log('data Array:', data.data.stories);
        const stories_from_db = data.data.stories;
        // console.log('Stories from db:', stories_from_db);
        stories_from_db.forEach((story: any) => {
          // console.log('story', story);
          // storing all the stories in an array
          this.stories.push(story);
        });
        console.log("This.stories: ", this.stories)
      },
      (error) => {
        alert('Error in getting the data!');
      }
    );
  }

  //function to open dialog box for profile
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, email: this.email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }
}

@Component({
  selector: 'diaglog',
  templateUrl: 'home.dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changepasswrd: boolean = false;
  changepassword() {
    this.changepasswrd = !this.changepasswrd;
  }
}
