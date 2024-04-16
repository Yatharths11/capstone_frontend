import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-min',
  templateUrl: './story-min.component.html',
  styleUrl: './story-min.component.css',
})
export class StoryMinComponent implements OnInit {
  @Input() story: any;
  @Output() storyId: EventEmitter<any> = new EventEmitter<any>()
  
  ngOnInit(): void {
    // console.log("here is the story from child:",this.story);
    this.singlestory = this.story;
    // console.log("yoyoyo",this.singlestory);
  }

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthTokenPresent();
    this.getall();
  }

  canClick: boolean = false;
  contents: Array<object> = [];
  singlestory: any;
  created_date = Date()
  storyid = '';
  text = '';  
  description = '';
  username = '';
  title = '';
  like: boolean = false;



  /**
   * Function to get the data of the story as soon as the page is loaded.
   */
  getall() {
    this.http.get<any>('http://localhost:8080/story/all').subscribe(
      (data) => {
        // console.log(data.data.stories[0].content);
        // this.singlestory = data.data.stories[0]
        this.storyid = this.singlestory._id;
        this.text = this.singlestory.content[0].text;
        const prompt_id = this.singlestory.prompt;
        this.created_date = this.singlestory.createdAt
        console.log('prompt id ' + prompt_id);

        this.http
          .get<any>(`http://localhost:8080/prompt/prompt?id=${prompt_id}`)
          .subscribe((prompt) => {
            // console.log(prompt);
            this.title = prompt.prompt.title;
            this.description = prompt.prompt.description;
            this.username = prompt.prompt.creator;
          });

        const content = {
          text: this.singlestory.content[0].text,
          description: this.description,
          title: this.singlestory.content[0].title,
        };
        this.contents.push(content);
      },
      (error) => {
        alert('Error in getting the data!');
      }
    );
  }

  /**
   * Function to check if the user is logged in or not
   */
  private readonly TOKEN_KEY = 'my_app_token';
  isAuthTokenPresent(): boolean {
    this.canClick = true;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  
  clicked() {
    //console.log("clicked");
    this.storyId.emit(this.storyid);
    this.router.navigate(['/story',this.storyid]);
  }

  liked(){
    console.log("liked")
    const icon = document.querySelector('.like');
    if (icon) {
      icon.classList.remove('pi-heart');
      icon.classList.add('pi-heart-fill');
    }
  }
}