import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbCreateResponse, Post } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post>{
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
    .pipe(
      map((response: FbCreateResponse) => {
        console.log('r',response);
        
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)

        }
        
      })
    )
  
  }


  getAll(): Observable<Post[]>{
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(map(response =>{
        return Object.keys(response)
        .map( key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      
    })) 
  }

  getById(id: string): Observable<Post>{
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
    .pipe(map((post: Post) => {
     return {
       ...post,
       id
     }

    }))
  }

  upDate(post){
   
  }

  delete(id: string){
    return this.http.delete(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
