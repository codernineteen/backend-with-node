import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getAMovie(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`A Movie(id:${movieId}) not found`);
    }
    return movie;
  }

  search(searchingYear: number) {
    const movies = this.movies.filter((movie) => movie.release > searchingYear);
    if (!movies) {
      throw new NotFoundException(
        `There is no movie released after year : ${searchingYear}`,
      );
    }
    return movies;
  }

  deleteAMovie(movieId: number) {
    const movieToDelete = this.getAMovie(movieId);
    this.movies = this.movies.filter((movie) => movie !== movieToDelete);
  }

  createAMovie(movie: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movie,
    });
  }

  updateAMovie(movieId: number, movieDataToUpdate: UpdateMovieDTO) {
    const movie = this.getAMovie(movieId);
    this.deleteAMovie(movieId);
    this.movies.push({ ...movie, ...movieDataToUpdate });
  }
}
