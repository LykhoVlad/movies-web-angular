import { Movie } from './../../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrls: ['./page-banner.component.scss']
})
export class PageBannerComponent implements OnInit {

  @Input() movies: Movie
  @Output() searchMoviesEvent = new EventEmitter<Movie>();
  posterId: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.posterId = Math.floor(Math.random() * 10) + 2;
  }

  searching(event) {
    this.searchMoviesEvent.emit(event.target.value)
  }

}
