import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreServiceService } from 'src/app/Service/offre-service.service';

@Component({
  selector: 'app-addoffre',
  templateUrl: './addoffre.component.html',
  styleUrls: ['./addoffre.component.css']
})
export class AddoffreComponent implements OnInit {
  offreForm!: FormGroup;
  tags: string[] = []; // Add a property to store the tag names
  tagSuggestions: string[] = [];
  selectedTags: string[] = [];
  constructor(private formBuilder: FormBuilder, private apiService: OffreServiceService) { }

  ngOnInit(): void {
    this.offreForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      tags: [''] // Add a form control for the tags
    });
    this.offreForm.get('tags')?.valueChanges.subscribe(tagPrefix => {
      if (tagPrefix && tagPrefix.length >= 2) {
        this.apiService.getTagSuggestions(tagPrefix).subscribe(
          suggestions => {
            this.tagSuggestions = suggestions;
          },
          error => {
            console.error('Error fetching tag suggestions:', error);
          }
        );
      } else {
        this.tagSuggestions = [];
      }
    });

  }
  onTagInputChange(tagsInput: HTMLInputElement) {
    // Split the tag input value to get individual tags
    const tagInputValue = tagsInput.value;
    const tags: string[] = tagInputValue.split(' ');
    this.selectedTags = tags.filter(tag => tag.trim() !== '');
  }

  removeTag(tag: string) {
    const tagIndex = this.selectedTags.indexOf(tag);
    if (tagIndex !== -1) {
      this.selectedTags.splice(tagIndex, 1);
    }
  }




  submit() {
    if (this.offreForm.invalid) {
      return;
    }
    // Get the tag names from the form control and split them using a hyphen
  const tagsValue = this.offreForm.get('tags')?.value as string;
  const tagNames: any = Array.isArray(tagsValue) ? tagsValue.split(' ') : tagsValue.split(' ');
  console.log(tagsValue);


  // Create the Offre object with the form values
  const offre = {
    titre: this.offreForm.get('titre')?.value,
    description: this.offreForm.get('description')?.value,
    createur: null,
    tags: tagNames.length > 0 ? tagNames : this.selectedTags
  };

  // Call your API service to add the offer
  this.apiService.createOffre(offre).subscribe(
    response => {
      console.log('Offer added successfully:', response);
      this.offreForm.reset();
    },
    error => {
      console.error('Error adding offer:', error);
    }
  );
}

}
