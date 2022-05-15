import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  post: Post

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(){

    this.form = new FormGroup({
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      text: new FormControl( '', Validators.required)
    })
    
    this.route.params.pipe(
      switchMap((params: Params) => {
      return this.postsService.getById(params['id'])
      
    })
    ).subscribe( (post: Post) => {
      this.post = post
      this.form = new FormGroup({
        author: new FormControl(post.author, Validators.required),
        title: new FormControl(post.title, Validators.required),
        text: new FormControl( post.text, Validators.required)
      })
      
    })
  }

  upDate(){
    
    
  }

}
