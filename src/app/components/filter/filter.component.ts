import { HttpClient } from '@angular/common/http';
import { GetMoviesService } from './../../services/get-movies.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Genre, Movie } from 'src/app/pages/home/home.component';

export interface Categories {
  name: string;
}

export interface Filter {
  sort_by: string,
  page: number,
  with_genres: string
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  categories: Categories[] = [
    {
      name: 'popular'
    },
    {
      name:'top_rated'
    },
    {
      name: 'upcoming'
    }
  ]
  sorted: Array<string> = ['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc']
  sortBy = 'popularity.desc';
  filter: Filter = {sort_by: '', page: 1,  with_genres: ''};

  constructor(private http: HttpClient) { }

  @Input() genresArr: Genre[] = [];
  @Output() changeCat: EventEmitter<string> =  new EventEmitter<string>()
  @Output() changeSortBy: EventEmitter<string> =  new EventEmitter<string>()
  @Output() filterMoviesList: EventEmitter<Movie> =  new EventEmitter<Movie>()

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Categories[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }

  changeCategory(category) {
    this.changeCat.emit(category);
  }

  changeSort(value) {
    this.filter.sort_by = value;
    this.filterMovies();
    console.log('sort-filter',this.filter)
  }

  changeGenre(genreID) {
    this.filter.with_genres = genreID;
    this.filterMovies();
    console.log('genre-filter',this.filter)
  }

  filterMovies() {
    this.http.get<Movie>(`https://api.themoviedb.org/3/discover/movie?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US&sort_by=${this.filter.sort_by}&include_adult=false&include_video=false&page=${this.filter.page}&with_genres=${this.filter.with_genres}&with_watch_monetization_types=flatrate`)
    .subscribe(response => {
      this.filterMoviesList.emit(response)
    })
  }

}
