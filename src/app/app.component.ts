import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

export interface Movie {
  backdrop_path: string,
  poster_path: string,
  title: string,
  genre_ids: Array<number>,
  id: number,
  overview: string,
  popularity: number,
  release_date: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}
export interface Genre {
  id: number,
  name: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {}
}
