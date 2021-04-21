import { Genre, Movie } from './../home/home.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// export interface Account {
//   avatar: object,
//   id: number,
//   iso_639_1: string,
//   iso_3166_1: string,
//   name: string,
//   include_adult: boolean,
//   username: string
// }

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  account: object = {};
  sessionID: string;
  accountID: number;
  moviesList: Movie[] = [];
  genres: Genre[] = []


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.sessionID = localStorage.getItem('session_id');
    this.http.get(`https://api.themoviedb.org/3/account?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&session_id=${this.sessionID}`)
    .subscribe(response => {
      this.account = response;
      this.accountID = response['id'];
      localStorage.setItem('acc_id', response['id']);
    })
  }

  getFavourite() {
    this.http.get<Movie>(`https://api.themoviedb.org/3/account/${this.accountID}/favorite/movies?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&session_id=${this.sessionID}&language=en-US&sort_by=created_at.asc&page=1`)
    .subscribe(res => {
      this.moviesList = res['results'];
    })
  }

  getNamesGenres() {
    this.http.get<Genre>('https://api.themoviedb.org/3/genre/movie/list?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US')
    .subscribe(response => {
      this.genres = response['genres'];
    })
  }

}
