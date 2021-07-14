import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StoryService } from '../../services/story.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {

  storyForm = this.fb.group({
    storyTitle: ['', [Validators.required]],
    visibilityStatus: ['', [Validators.required]],
    storyContent: ['', [Validators.required]]
  });

  constructor(
      public fb: FormBuilder,
      private storyService: StoryService,
      private router: Router,
      private ngZone: NgZone,
      private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.storyForm == null || !this.storyForm.valid) {
      return false;
    } else {
      // Add Story
      this.storyService.createStory(this.storyForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(
              "New Story Added!",
              {cssClass: 'alert-success', timeout: 3000 /* 3 seconds */});
          this.ngZone.run(() => this.router.navigateByUrl('/my-stories'));
        } else {
          this.flashMessage.show(
              "Cannot Add a Story",
              {cssClass: 'alert-danger', timeout: 3000 /* 3 seconds */});
        }
      });

      return true;
    }
  }
}
