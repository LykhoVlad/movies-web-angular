import { HttpClient } from '@angular/common/http';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export interface Details {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: string,
  budget: number,
  genres: Array<object>,
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: object,
  production_countries: object,
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: object,
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

export interface Credits {
  cast: object,
  crew: object
}

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  details: Details
  credits: Credits

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getDetails(params.id);
      this.getCredits(params.id);
    })
  }

  getDetails(id) {
    this.http.get<Details>(`https://api.themoviedb.org/3/movie/${id}?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US`)
      .subscribe(response => {
        this.details = response;
      })
  }

  getCredits(id) {
    this.http.get<Credits>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US`)
    .subscribe(response => {
      this.credits = response;
      console.log(this.credits)
    })
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
