import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { MyStoriesComponent } from './components/my-stories/my-stories.component';
import { EditStoryComponent } from './components/edit-story/edit-story.component';
import { TempLoginComponent } from './components/temp-login/temp-login.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-story', component: AddStoryComponent, canActivate: [AuthGuard] },
  { path: 'story-detail/:id', component: StoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'my-stories', component: MyStoriesComponent, canActivate: [AuthGuard] },
  { path: 'edit-story/:id', component: EditStoryComponent, canActivate: [AuthGuard] },
  { path: 'temp-login', component: TempLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
