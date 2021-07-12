import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story.js';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  story: Story = {
    title: "default-title",
    body: "default-body",
    createdAt: "default date"
  };

  constructor(
      private actRoute: ActivatedRoute,
      private storyService: StoryService) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id') || "";
    this.getStory(id);
  }

  getStory(id: string) {
    this.storyService.getStory(id).subscribe(data => {
      this.story = {
        title: data["title"],
        body: data["body"],
        createdAt: data["createdAt"]
      };
    });
  }

}
