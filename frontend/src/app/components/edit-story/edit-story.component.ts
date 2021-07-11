import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnInit {

  storyForm = this.fb.group({
    storyTitle: ['', [Validators.required]],
    visibilityStatus: ['', [Validators.required]],
    storyContent: ['', [Validators.required]]
  });

  constructor(
      public fb: FormBuilder,
      private storyService: StoryService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.storyForm == null || !this.storyForm.valid) {
      return false;
    } else {
      // Add Story
      this.storyService.createStory(this.storyForm.value).subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log("successfully added story");
        } else {
          console.log("cannot added story");
        }
      });

      return true;
    }
  }
}
