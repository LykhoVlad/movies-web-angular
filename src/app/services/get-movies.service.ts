import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {

  constructor(private http: HttpClient) { }

  getMovies(type, page) : Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${type}?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&language=en-US&page=${page}`
    return this.http.get<any>(url);
  }
}
