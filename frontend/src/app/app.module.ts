import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { StoryService } from './services/story.service';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { MyStoriesComponent } from './components/my-stories/my-stories.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { EditStoryComponent } from './components/edit-story/edit-story.component';
import { TempLoginComponent } from './components/temp-login/temp-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    StoryDetailComponent,
    MyStoriesComponent,
    AddStoryComponent,
    EditStoryComponent,
    TempLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
