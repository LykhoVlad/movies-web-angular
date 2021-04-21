import { HttpClient } from '@angular/common/http';
import { Movie, Genre } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from 'src/app/services/get-movies.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  moviesList: Movie[] = [];
  genres: Genre[] = [];
  moviesType: string = 'popular';
  moviesPage: number = 1;
  collection: any[] =  [];
  filterShow: boolean = false;

  constructor(
    private http: HttpClient,
    private getMoviesType: GetMoviesService
    ) { }

  ngOnInit(): void {
    this.getMoviesList(this.moviesType, this.moviesPage);
    this.getNamesGenres();
  }

  getMoviesList(type, page) {
    if(page) this.moviesPage = page;
    if(type) this.moviesType = type;
    this.getMoviesType.getMovies(this.moviesType, this.moviesPage).subscribe((data) => {
      this.moviesList = data.results;
      this.collection = data.total_pages;
    })
  }

  getNamesGenres() {
    this.http.get<Genre>('https://api.themoviedb.org/3/genre/movie/list?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US')
    .subscribe(response => {
      this.genres = response['genres'];
    })
  }

  pageChanged(e) {
    this.getMoviesList(this.moviesType, e)
  }

  changeMoviesCategory(category: String) {
    this.getMoviesList(category, 1);
  }

  changeMoviesSort() {
    this.moviesList.reverse();
  }

  filter(data) {
    this.moviesList = data['results'];
    this.collection = data['total_pages'];
  }
}
