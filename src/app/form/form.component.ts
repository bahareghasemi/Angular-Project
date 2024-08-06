import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, IPost } from '../services/api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() post: IPost | null = null;
  @Output() formSubmit = new EventEmitter<IPost>();

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    thumbnailUrl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    url: new FormControl('', [Validators.required]),
    albumId: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private apiService: ApiService) {}

  onSubmit() {
    if (this.addForm.valid) {
      const newPost = {
        title: this.addForm.value.title!,
        thumbnailUrl: this.addForm.value.thumbnailUrl!,
        url: this.addForm.value.url!,
        albumId: Number(this.addForm.value.albumId!)
      } as Omit<IPost, 'id'>;
      this.apiService.addPost(newPost).subscribe(data => {
        this.formSubmit.emit(data);
      
      this.router.navigate(['/api-data'], { state: { newPost: data } });
    });
    }
  }
}