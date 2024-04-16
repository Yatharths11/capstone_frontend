import { CommonModule } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, Inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
export interface DialogData {
  email: string
  name: string
}

@Component({
  selector: 'app-mycontributions',
  templateUrl: './mycontributions.component.html',
  styleUrl: './mycontributions.component.css',
})
export class MycontributionsComponent {


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    const secretKey = localStorage.getItem('my_app_token')
    if (secretKey === null) {
      this.openSnackbarWithAction('Please Login to Continue', 'Login')
    } else {
      this.getContributions()
    }
  }


  animal: string = 'umesh@error.com'
  name: string = ''
  canClick: boolean = true
  current_streak = 0
  longest_streak = 0
  private readonly TOKEN_KEY = 'my_app_token'


  openSnackbarWithAction(message: string, actionText: string) {
    const snackBarRef = this._snackBar.open(message, actionText, {
      duration: 3000, // Adjust duration as needed
    })

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/login'])
    })
  }


  isAuthTokenPresent(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }


  //logout 
  logout(): void {
    this.router.navigate(["/home"])
    localStorage.removeItem('my_app_token')
  }

  //disable the add button 
  disableButton() {
    this.canClick = false
  }


  stories: Array<Object> = []


  getContributions() {
    const secretKey = localStorage.getItem('my_app_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    })

    this.http
      .get('http://localhost:8080/story/getbyusername', { headers })
      .subscribe((response: any) => {
        this.current_streak = response.current_streak
        this.longest_streak = response.longest_streak
        console.log(response)

        response.stories.forEach((element: any) => {
          console.log(element)
          this.stories.push(element)
        })
      })
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed')
      this.animal = result
    })
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
    this.dialogRef.close()
  }

  changepasswrd: boolean = false
  changepassword() {
    this.changepasswrd = !this.changepasswrd
  }
}
