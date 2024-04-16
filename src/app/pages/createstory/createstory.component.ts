import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

////////////////////
// import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

////////////////////
@Component({
  selector: 'app-createstory',
  templateUrl: './createstory.component.html',
  styleUrl: './createstory.component.css',
})
export class CreatestoryComponent implements OnInit {
  // Initialize input to blank
  title: string = '';
  prompt: string = '';
  story: string = '';
  userarray_error: string = '';
  isPrivate = false; // Initial state: Public selected
  isGroup = false; // Initial stat: Personal Selected
  usernamesForm: FormGroup | any; //  could be 
  sid:string = ""

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const secretKey = localStorage.getItem('my_app_token')
    if (secretKey === null) {
      alert('Please login first!')
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.usernamesForm = this.formBuilder.group({
      usernames: this.formBuilder.array([], Validators.required),
    });
  }

  /**
   * function to toggle privacy
   * @param isPublic
   */
  onPrivacyChange(isPublic: boolean) {
    this.isPrivate = isPublic;
    console.log(this.isPrivate);
  }
  /**
   * function that toggles between ispersonal and isgroup
   * @param isGroup
   */
  onGroupChange(isGroup: boolean) {
    this.isGroup = isGroup;
    console.log('Group toggle', this.isGroup);
  }

  /**
   * Get username from the user's input field and add it
   */
  get usernames(): FormArray {
    return this.usernamesForm.get('usernames') as FormArray;
  }

  /**
   * Add a new input field for username
   */
  addUsernameField() {
    this.usernames.push(this.formBuilder.control('', Validators.required));
  }

  /**
   * Remove an input field for username
   * @param index
   */
  removeUsernameField(index: number) {
    this.usernames.removeAt(index);
  }
  playspinner = false
  story_id = '';
  // Submit the form and send data to server
  async submitStory() {
    // getting the token form the localStorage
    const secretKey = localStorage.getItem('my_app_token');
    console.log("1",secretKey);
    console.log('2. from data', this.usernames);
    if (this.isPrivate && this.isGroup) {
      if (this.usernames.length === 0) {
        this.userarray_error = 'Please enter at least User a group';
        return;
      }
    }

    //  Create HTTP Headers with JWT Token for authentication
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${secretKey}`,
    });
    // console.log(headers)

    //Create HTTP Body
    const storycreation_body = {
      title: this.title,
      description: this.prompt,
      isPrivate: this.isPrivate,
      story: this.story,
      contributors: '',
    };
    // console.log(body)
    let new_id = ''
    //making a post request to create a story on the server
    this.playspinner = true
    
    this.http
      .post('http://localhost:8080/story/create', storycreation_body, {
        headers,
      })
      .subscribe((response: any) => {
        if (response) {
          console.log('3. response from story', response.story._id);
          this.story_id = response.story._id;
          this.sid = response.story._id;
          // console.log(this.sid);
          console.log('4. story created', response.story._id);
        }
      });
    console.log("5. value",this.usernames.value);
    setTimeout(()=>{
      const groupcreation_body = {
        storyId: this.story_id,
        list: this.usernames.value,
      };
      // console.log();
      
      console.log('6. here we are',groupcreation_body);
      this.http
        .post('http://localhost:8080/group/create', groupcreation_body, {
          headers,
        })
        .subscribe((response: any) => {
          console.log(`7. Group created  : ${response}`);
        });
      // this.router.navigate(['/home']);
      console.log('8. here is the data', this.usernamesForm.value);
      this.playspinner = false
      this.router.navigate(["/home"])
    },5000)
    
  }

  //
}
