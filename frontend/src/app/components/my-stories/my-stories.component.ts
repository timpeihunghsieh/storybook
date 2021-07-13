import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit {

  myStories :any = [];

  constructor(private storyService: StoryService) {
    this.getMyStories();
  }

  ngOnInit(): void {
  }

  getMyStories(): void {
    this.storyService.getMyStories().subscribe((data) => {
     this.myStories = data;
    })
  }
}
