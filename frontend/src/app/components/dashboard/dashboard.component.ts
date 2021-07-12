import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stories :any = [];

  constructor(private storyService: StoryService) {
    this.getStories();
  }

  ngOnInit(): void {
  }

  getStories(): void {
    this.storyService.getStories().subscribe((data) => {
     this.stories = data;
    })    
  }

}
