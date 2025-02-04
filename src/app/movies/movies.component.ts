import { IMovie } from '../imovie';
import { MoviesService } from './../movies.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  moviesList!: IMovie[];
  movieGroups: IMovie[][] = [];
  imageUrl: string = 'https://image.tmdb.org/t/p/original';
  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.showMovies();
  }
  showMovies() {
    this.moviesService.getMovies().subscribe({
      next: (res) => {
        this.moviesList = res.results;
        this.groupMovies();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  groupMovies() {
    let cards: number;
    if (window.innerWidth >= 992) {
      cards = 3; // Large screens
    } else if (window.innerWidth >= 768) {
      cards = 2; // Medium screens
    } else {
      cards = 1; // small screens
    }
    // Clear existing groups
    this.movieGroups = [];
    for (let i = 0; i < this.moviesList.length; i += cards) {
      this.movieGroups.push(this.moviesList.slice(i, i + cards));
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.groupMovies();
  }
}
