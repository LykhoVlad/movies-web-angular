import { GetMoviesService } from './../../services/get-movies.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Movie {
  backdrop_path: string,
  poster_path: string,
  title: string,
  genre_ids: Array<number>,
  id: number,
  overview: string,
  popularity: number,
  release_date: string,
  vote_average: number,
  vote_count: number
}
export interface Genre {
  id: number,
  name: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = []
  genres: Genre[] = []
  page: number = 1;
  type: string = 'top_rated';
  collection: any[] =  [];

  constructor(
    private http: HttpClient,
    private getMoviesType: GetMoviesService) {
      this.movies = new Array<any>()
    }

  ngOnInit() {
    this.getMoviesList(this.type, this.page);
    this.getNamesGenres();
  }

  searchMovie(search) {
    if(search) {
      this.http.get('https://api.themoviedb.org/3/search/movie?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US&page=1&include_adult=false', {
        params: new HttpParams().set('query', search)
      })
      .subscribe(response => {
        this.movies = response['results']
      })
    } else {
      this.getMoviesList(this.type, this.page);
    }
  }

  getMoviesList(type, page) {
    if(page) this.page = page;
    if(type) this.type = type;
    this.getMoviesType.getMovies(this.type, this.page).subscribe((data) => {
      this.movies = data.results;
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
    this.getMoviesList(this.type, e)
  }
}
