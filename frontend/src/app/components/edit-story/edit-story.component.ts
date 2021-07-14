import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StoryService } from '../../services/story.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages'; 

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
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id') || "";
    this.getStory(id);
  }

  getStory(id: string) {
    this.storyService.getStory(id).subscribe(data => {
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
        if (data.success) {
          this.flashMessage.show(
              "Story Updated!",
              {cssClass: 'alert-success', timeout: 3000 /* 3 seconds */});
          this.ngZone.run(() => this.router.navigateByUrl('/my-stories'));
        } else {
          this.flashMessage.show(
              "Cannot Update the story",
              {cssClass: 'alert-danger', timeout: 3000 /* 3 seconds */});
        }
      });

      return true;
    }
  }
}
