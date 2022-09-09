import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  //Nest.js has a dependency injection. If we give MoviesService Module as a provider
  //it will automatically inject it into controllers without any import
  providers: [MoviesService],
})
export class MoviesModule {}
