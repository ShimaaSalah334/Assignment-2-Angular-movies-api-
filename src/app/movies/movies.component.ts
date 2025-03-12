import { IMovie } from '../imovie';
import { MoviesService } from './../movies.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-movies',
  imports: [CarouselModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  moviesList!: IMovie[];
  movieGroups: IMovie[][] = [];
  imageUrl: string = 'https://image.tmdb.org/t/p/original';
  constructor(private moviesService: MoviesService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="images/prev.png" alt="Previous">',
      '<img src="images/next.png" alt="Next">',],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.showMovies();
  }
  showMovies() {
    this.moviesService.getMovies().subscribe({
      next: (res) => {
        this.moviesList = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
