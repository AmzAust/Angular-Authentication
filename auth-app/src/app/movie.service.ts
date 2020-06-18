import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _moviesUrl = 'http://localhost:3000/api/movies';
  private _paidmoviesUrl = 'http://localhost:3000/api/paidmovies';

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<any>(this._moviesUrl);
  }

  getPaidMovies() {
    return this.http.get<any>(this._paidmoviesUrl);
  }
}
