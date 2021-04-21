import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  movies: Movie[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getMovies(page) {
    this.http.get<Movie>(`https://api.themoviedb.org/3/movie/top_rated?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US&page=${page}`)
    .subscribe(response => {
      this.movies = response['results'];
    })
  }

}
