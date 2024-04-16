import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-story-full',
  templateUrl: './story-full.component.html',
  styleUrl: './story-full.component.css',
})
export class StoryFullComponent implements OnInit {
  //Story Id from the story-min component
  @Input() story_id: any;

  constructor(
    private http: HttpClient,
    private activatedrouter: ActivatedRoute, // to access the data in the route
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const secretKey = localStorage.getItem('my_app_token');
    if (secretKey === null) {
      this.openSnackbarWithAction('Please Login to Continue', 'Login');
    } else {
      this.activatedrouter.params.subscribe((params) => {
        this.story_id = params['id']; // story id from the route parameter
        // console.log('Hojyega', this.story_id)
      });
      this.getall();
    }
  }

  userInput = '';
  storyid = '';
  text = '';
  description = '';
  title = '';
  story = '';
  canClick = true;
  content: Array<content> = [];
  story_array = [];

  openSnackbarWithAction(message: string, actionText: string) {
    const snackBarRef = this._snackBar.open(message, actionText, {
      duration: 3000, // Adjust duration as needed
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  //Function to get data of story form the API
  getall() {
    //GET call
    this.http
      .get<any>(`http://localhost:8080/story/story?id=${this.story_id}`)
      .subscribe(
        (data) => {
          //the prompt
          console.log('data', data.data.story.prompt);

          //prompt id fetching
          const prompt_id = data.data.story.prompt;

          //prompt if verification
          console.log('prompt id ' + prompt_id);

          //verification of content
          this.content = data.data.story.content;
          console.log('This is the content:', this.content);

          //iterating on the content
          this.content.forEach((element) => {
            console.log(element.text);
            this.story = this.story + ' \n\n' + element.text;
          });

          //Get call to get prompt for a particular story
          this.http
            .get<any>(`http://localhost:8080/prompt/prompt?id=${prompt_id}`)
            .subscribe(
              (prompt) => {
                this.title = prompt.prompt.title;
                this.description = prompt.prompt.description;
              },
              (error) => {
                alert('Error in getting the data!' + error);
              }
            );

          const content = {
            text: data.data.stories[0].content[0].text,
            description: this.description,
            title: data.data.stories[0].content[0].title,
          };
          console.log(content);
        },
        (error) => {
          // alert('Error in getting the data!')
        }
      );
  }

  additionerror = '';

  onAddClick() {
    this.story = '';
    if (this.userInput.trim().length > 0) {
      // console.log('User input:', this.userInput)

      const secretKey = localStorage.getItem('my_app_token');
      if (secretKey === null) {
        alert('Please login first!');
        this.router.navigate(['/login']);
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      });
      this.http
        .post(
          `http://localhost:8080/story/add?id=${this.story_id}`,
          {
            title: this.title,
            description: this.description,
            isPrivate: false,
            text: this.userInput,
          },
          { headers }
        )
        .subscribe((response) => {
          // console.log(response)
          this.getall();
        });
      this.getall();
      this.disableButton();
      this.userInput = '';
    } else {
      this.additionerror = 'Please enter some text.';
    }
  }

  disableButton() {
    this.canClick = false;
  }

  getId(id: any) {
    this.story_id = id;
    console.log('here is the story id', this.story_id);
  }
}
