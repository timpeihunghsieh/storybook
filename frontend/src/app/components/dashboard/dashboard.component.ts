import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myUid :string = "";
  stories :any = [];

  constructor(private storyService: StoryService) {
    this.getStories();
    this.getMyself();
  }

  ngOnInit(): void {
  }

  getStories(): void {
    this.storyService.getStories().subscribe((data) => {
     this.stories = data;
     console.log("getStories");
     console.log(this.stories);
    })    
  }

  // TODO(timhsieh): Ideally this should be fetched locally
  getMyself(): void {
    this.storyService.getMyUid().subscribe((data) => {
      this.myUid = data;
      console.log("myUid");
      console.log(this.myUid);
    });
  }

}
