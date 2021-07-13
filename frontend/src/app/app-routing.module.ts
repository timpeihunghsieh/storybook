import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { MyStoriesComponent } from './components/my-stories/my-stories.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-story', component: AddStoryComponent },
  { path: 'story-detail/:id', component: StoryDetailComponent },
  { path: 'my-stories', component: MyStoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
