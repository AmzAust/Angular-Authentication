import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-paidmovies',
  templateUrl: './paidmovies.component.html',
  styleUrls: ['./paidmovies.component.css']
})
export class PaidmoviesComponent implements OnInit {

  paidMovies = [];
  constructor(private _movieService: MovieService,
              private _router: Router) { }

  ngOnInit(): void {
    this._movieService.getPaidMovies()
      .subscribe(
        res => this.paidMovies = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }

}
