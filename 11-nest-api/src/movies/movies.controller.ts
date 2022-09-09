import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

//The string inside of @Controller('') points to entry point
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }
  //If you put this get method under the '/:id' route, it will be overlapped
  //To avoid that, you need to locate the blocks of same route before the params block
  @Get('/search')
  search(@Query('release') searchingYear: number) {
    return this.moviesService.search(searchingYear);
  }

  //To use parameter, you always request it to Nest.js using Decorator(@Param)
  //The url parameter and @Param's parameter name should be same,
  // but the parameter name that we use doens't have to be same with the two of params name
  @Get('/:id')
  getAMovie(@Param('id') movieId: number): Movie {
    return this.moviesService.getAMovie(movieId);
  }

  @Post()
  createAMovie(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.createAMovie(movieData);
  }

  @Delete('/:id')
  deleteAMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteAMovie(movieId);
  }

  @Patch('/:id')
  updateAMovie(
    @Param('id') movieId: number,
    @Body() movieDataToUpdate: UpdateMovieDTO,
  ) {
    return this.moviesService.updateAMovie(movieId, movieDataToUpdate);
  }
}
