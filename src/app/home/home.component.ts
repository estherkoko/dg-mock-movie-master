import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 movies: any;
 movieData: any;
 allMoviesData: any;
 filteredMoviesArray: any;
 Title: string;
 selectedYear: string;
 imdb: string;

  constructor(private http: HttpClient) {
    this.allMoviesData = [];
    this.selectedYear = '20';
    this.filteredMoviesArray = [];
   }

  ngOnInit() {
    this.getMovies();
    setTimeout(() => this.filterMovies('20'), 2000);
  }

   getMovies(){
      this.http.get(`${this.url}&s=batman`).subscribe(data => {
        this.movieData = data;
        this.movies = this.movieData.Search;
      },
      (err) => console.error(err),
      () => this.getMovieDetails()
    )
  }
  
  getMovieDetails() {
    let batmanImdbIdArray = this.getImdbIdsFromMovies(this.movies);
    batmanImdbIdArray.forEach(imdbId => {
      this.addMovieDetailsIntoAllMoviesDataArray(imdbId)
    });
    this.filterMovies('20');
  }

  getImdbIdsFromMovies(movies) {
    let result = movies.map(movie => movie.imdbID);
    return result;
  }

  addMovieDetailsIntoAllMoviesDataArray(imdbId){
    this.http.get(`${this.url}&i=${imdbId}`).subscribe(data => {
      this.allMoviesData.push(data);
    });
  }

  filterMovies(year){
    this.selectedYear = year;
    this.filteredMoviesArray = this.allMoviesData.filter(movie => {
      return movie.Year.startsWith(year)    
    })
  }
}
