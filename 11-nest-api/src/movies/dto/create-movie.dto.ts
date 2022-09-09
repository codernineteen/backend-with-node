import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly release: number;
  @IsOptional()
  readonly actor: string[];
  @IsOptional()
  readonly genres: string[];
}
