import { SetFavoriteService } from './../../services/set-favorite.service';
import { HttpClient } from '@angular/common/http';
import { Movie, Genre } from './../../app.component';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MovieItemComponent implements AfterViewChecked {

  @Input() movie: Movie;
  @Input() genresArr: Genre[];
  movieGenres: any;

  constructor(private setFavorite: SetFavoriteService) {}

  ngAfterViewChecked(): void {
    this.getGenreName();
  }

  getGenreName() {
    const currentGenreId = this.movie.genre_ids;
    this.movieGenres = this.genresArr.filter(genre => {
      return currentGenreId.some(genreId => genre.id === genreId)
    })
  }

  setFavourite(id) {
    this.setFavorite.setFavoriteMovie(id)
    .subscribe(resp => {
      console.log('SET', resp)
    })
  }
}
