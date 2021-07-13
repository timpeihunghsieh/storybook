import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoryService } from '../../services/story.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnInit {

  storyForm = this.fb.group({
    id: [''],
    storyTitle: ['', [Validators.required]],
    visibilityStatus: ['', [Validators.required]],
    storyContent: ['', [Validators.required]]
  });

  constructor(
      private actRoute: ActivatedRoute,
      private storyService: StoryService,
      public fb: FormBuilder) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id') || "";
    this.getStory(id);
  }

  getStory(id: string) {
    this.storyService.getStory(id).subscribe(data => {
      console.log("updated story");
      console.log(this.storyForm);

      this.storyForm.setValue({
        id: data["_id"],
        storyTitle: data["title"],
        visibilityStatus: data["status"],
        storyContent: data["body"]
      });
    });
  }

  onSubmit() {
    if (this.storyForm == null || !this.storyForm.valid) {
      return false;
    } else {
      // Edit Story
      this.storyService.editStory(this.storyForm.value).subscribe(data => {
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
