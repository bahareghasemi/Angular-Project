import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IPost {
  title: string;
  thumbnailUrl: string;
  id: number;
  albumId: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://jsonplaceholder.typicode.com/photos';
  
  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url);
  }

  addPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.http.post<IPost>(this.url, post);
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${this.url}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
