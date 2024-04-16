import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { StoryMinComponent } from './components/story-min/story-min.component';
import { StoryPageComponent } from './pages/story-page/story-page.component';
import { CreatestoryComponent } from './pages/createstory/createstory.component';
import { MycontributionsComponent } from './pages/mycontributions/mycontributions.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AddtextComponent } from './pages/addtext/addtext.component';
import { PrivateStoryComponent } from './pages/private-story/private-story.component';
// import { ReminderPageComponent } from './pages/reminder-page/reminder-page.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'home',component:HomepageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'temp',component:StoryMinComponent},
  {path:'story/:id',component:StoryPageComponent},
  {path:'create',component:CreatestoryComponent},
  {path:'contributions',component:MycontributionsComponent},
  {path:'private',component:PrivateStoryComponent},
  {path:'**',component:PagenotfoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
