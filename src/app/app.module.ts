import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoryMinComponent } from './components/story-min/story-min.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './pages/signup/signup.component';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  NgControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { StoryFullComponent } from './components/story-full/story-full.component';
import { StoryPageComponent } from './pages/story-page/story-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddtextComponent } from './pages/addtext/addtext.component';
import { MycontributionsComponent } from './pages/mycontributions/mycontributions.component';
import { CreatestoryComponent } from './pages/createstory/createstory.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrivateStoryComponent } from './pages/private-story/private-story.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { z } from 'zod';
@NgModule({
  declarations: [
    AppComponent,
    SidenavbarComponent,
    StoryMinComponent,
    HomepageComponent,
    LoginPageComponent,
    SignupComponent,
    ForgotPasswordComponent,
    StoryFullComponent,
    StoryPageComponent,
    AddtextComponent,
    MycontributionsComponent,
    CreatestoryComponent,
    PagenotfoundComponent,
    PrivateStoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
