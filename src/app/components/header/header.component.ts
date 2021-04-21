import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shortTermToken: string;
  login: boolean;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const getSession = localStorage.getItem('session_id');
    if(getSession) this.login = Boolean( getSession );
    this.logAcc();
  }

  goToAuth () {
    this.http.get('https://api.themoviedb.org/3/authentication/token/new?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4')
      .subscribe(response => {
        this.shortTermToken = response['request_token'];
        if(this.shortTermToken) this.document.location.href = `https://www.themoviedb.org/authenticate/${this.shortTermToken}?redirect_to=http://localhost:4200/`
      })
  }

  logAcc() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params.request_token) {
        localStorage.setItem('request_token', params.request_token)
        this.http.post<any>('https://api.themoviedb.org/3/authentication/session/new?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4',
        {
          'request_token': params.request_token
        })
        .subscribe(res => {
          localStorage.setItem('session_id', res.session_id)
          this.login = true;
        })
      }
    })
  }

  logOut() {
    const session: string = localStorage.getItem('session_id');
    this.http.delete<any>('https://api.themoviedb.org/3/authentication/session?api_key=0f8b4587cc79cd9eb6a9b9ee66ceabd4', {
      params: new HttpParams().set('session_id', session)
    })
    .subscribe(resp => {
      localStorage.setItem('session_id', '');
      localStorage.setItem('acc_id', '');
      localStorage.setItem('request_token', '');
      this.login = false;
      console.log('LOGOUT', resp)
    })
  }

}
