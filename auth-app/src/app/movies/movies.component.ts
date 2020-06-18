import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies = [];
  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
    this._movieService.getMovies()
      .subscribe(
        res => this.movies = res,
        err => console.log(err)
      );
  }

}
