import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private http = inject(HttpClient);

  ngOnInit() {
    this.fetchHttpData();
  }

  async fetchHttpData() {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
    //   next: (posts) => {
    //     console.log(posts);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });

    try {
      const posts = await lastValueFrom(
        this.http.get('https://jsonplaceholder.typicode.com/posts')
      );
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  }
}
