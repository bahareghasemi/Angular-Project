import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, IPost } from '../services/api.service';
import { Router } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [CommonModule, FormComponent, FormsModule],
  templateUrl: './api-data.component.html',
  styleUrl: './api-data.component.css'
})
export class ApiDataComponent {
  
  posts: IPost[] = [];
  showForm = false;
  filteredPosts: IPost[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.getPosts().subscribe(
      data => {
        this.posts = data;
        this.filterPosts();
      },
      error => console.error('Error fetching data', error)
    );
  }

  addnewPost() {
    this.showForm = true;
  }

  onFormSubmit(newPost: IPost): void {
    this.apiService.addPost(newPost).subscribe(data => {
      console.log(data);
      this.posts.push(data);
      this.filterPosts();
      this.showForm = false; 
    });
  }

  editPost(id: number) {
    const updatedPost: Partial<IPost> = {
      title: 'Updated Title',
      thumbnailUrl: 'https://via.placeholder.com/600/updated',
      url: 'https://via.placeholder.com/600/updated-url',
      albumId: 1
    };
    this.apiService.updatePost(id, updatedPost).subscribe(data => {
      console.log(data);
      const index = this.posts.findIndex(post => post.id === id);
      if (index !== -1) {
        this.posts[index] = { ...this.posts[index], ...data };
      }
      this.filterPosts();
    });
  }

  deletePost(id: number) {
    this.apiService.deletePost(id).subscribe(() => {
      console.log(`Deleted post with id ${id}`);
      this.posts = this.posts.filter(post => post.id !== id);
      this.filterPosts();
    });
  }

  filterPosts(): void {
    if (this.searchTerm) {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.url.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.albumId.toString().includes(this.searchTerm) ||
        post.thumbnailUrl.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }
}
