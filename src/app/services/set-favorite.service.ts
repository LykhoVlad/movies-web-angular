import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetFavoriteService {

  currentMovieFavorite: boolean;

  constructor(private http: HttpClient) { }

  setFavoriteMovie(id) :Observable<any> {
    const accID = localStorage.getItem('acc_id');
    const session = localStorage.getItem('session_id');
    this.checkFavorite(session, id);
    console.log('CHECKKK', this.checkFavorite(session, id));
    const favorite = !this.currentMovieFavorite;
    const url = `https://api.themoviedb.org/3/account/${accID}/favorite?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&session_id=${session}`;

    return this.http.post(url, {
      "media_type": "movie",
      "media_id": id,
      "favorite": favorite
    })
  }

  checkFavorite(sessionID, movieID) :Observable<boolean> {
    let checks;
    this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieID}/account_states?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4&session_id=${sessionID}`)
    .subscribe(response => {
      checks = response.favorite;
    })
    console.log('CHECKSLS', checks)
    return this.currentMovieFavorite = checks
  }
}
