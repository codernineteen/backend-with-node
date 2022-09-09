import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

//mapped-types allows us to transform our DTO
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
