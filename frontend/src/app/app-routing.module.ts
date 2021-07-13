import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditStoryComponent } from './components/edit-story/edit-story.component';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { MyStoriesComponent } from './components/my-stories/my-stories.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit-story', component: EditStoryComponent },
  { path: 'story-detail/:id', component: StoryDetailComponent },
  { path: 'my-stories', component: MyStoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
