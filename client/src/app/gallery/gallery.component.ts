import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryForm: FormGroup;
  imageFile: File = null;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.galleryForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      imageTitle : [null, Validators.required],
      imageDesc : [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.api.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile').value._files[0])
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        if (res.body) {
          this.router.navigate(['/gallery-details', res.body._id]);
        }
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
