import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../homepage/homepage.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-private-story',
  templateUrl: './private-story.component.html',
  styleUrl: './private-story.component.css',
})
export class PrivateStoryComponent {
  email: string = '';
  name: string = '';
  canClick: boolean = true;
  stories: Array<Object> = [];
  has_private_strories: boolean = true;
  no_stories_error: string = 'No Stories Found';

  //Getting the token form the local storage
  private readonly TOKEN_KEY = 'my_app_token';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    const secretKey = localStorage.getItem('my_app_token');
    if (secretKey === null) {
      this.openSnackbarWithAction('Please Login to Continue', 'Login');
    } else {
      this.isAuthTokenPresent();
      this.getall();
    }
  }

  openSnackbarWithAction(message: string, actionText: string) {
    const snackBarRef = this._snackBar.open(message, actionText, {
      duration: 3000, // Adjust duration as needed
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  //check for auth token and return a boolean
  isAuthTokenPresent(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  //function for logout
  logout(): void {
    this.router.navigate(['/home'])
    localStorage.removeItem('my_app_token');
  }

  disableButton() {
    this.canClick = false;
  }

  //function to get all the stories from the database
  getall() {
    const secretKey = localStorage.getItem('my_app_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    });
    this.http
      .get<any>('http://localhost:8080/story/allprivate', { headers })
      .subscribe(
        (data) => {
          // console.log('Data received')
          // console.log('data Array:', data.data.stories)
          console.log(data.data.groups);

          if (data.data.groups.length === 0) {
            this.has_private_strories = false;
          }

          data.data.groups.forEach((group: any) => {
            console.log(group.storyId);
            this.http
              .get<any>(`http://localhost:8080/story/story?id=${group.storyId}`)
              .subscribe((response: any) => {
                console.log('story', response.data.story);
                this.stories.push(response.data.story);
              });
          });
        },
        (error) => {
          alert('Error in getting the data!');
          console.log(error);
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
