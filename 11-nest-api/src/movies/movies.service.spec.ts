import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array', () => {
      const result = service.getAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getAMovie', () => {
    it('should return a Movie', () => {
      service.createAMovie({
        title: 'test movie',
        genres: ['test'],
        release: 2022,
        actor: ['yechan'],
      });
      const movie = service.getAMovie(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getAMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`A Movie(id:999) not found`);
      }
    });
  });

  describe('deleteAMovie', () => {
    it('should be deleted', () => {
      service.createAMovie({
        title: 'test movie',
        genres: ['test'],
        release: 2022,
        actor: ['yechan'],
      });
      const beforeDelete = service.getAllMovies().length;
      service.deleteAMovie(1);
      const afterDelete = service.getAllMovies().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw 404 error', () => {
      try {
        service.getAMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`A Movie(id:999) not found`);
      }
    });
  });

  describe('createAMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAllMovies().length;
      service.createAMovie({
        title: 'test movie',
        genres: ['test'],
        release: 2022,
        actor: ['yechan'],
      });
      const afterCreate = service.getAllMovies().length;

      expect(beforeCreate).toBeLessThan(afterCreate);
    });
  });

  describe('updateAMovie', () => {
    it('should update', () => {
      service.createAMovie({
        title: 'test movie',
        genres: ['test'],
        release: 2022,
        actor: ['yechan'],
      });
      service.updateAMovie(1, { title: 'updated test' });
      const movie = service.getAMovie(1);
      expect(movie.title).toEqual('updated test');
    });
    it('should throw 404 error', () => {
      try {
        service.getAMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`A Movie(id:999) not found`);
      }
    });
  });

  describe('searchAMovie', () => {
    it('should search', () => {
      service.createAMovie({
        title: 'test movie',
        genres: ['test'],
        release: 2022,
        actor: ['yechan'],
      });
      service.search(2022);
      const movie = service.getAMovie(1);
      expect(movie.release).toEqual(2022);
    });

    it('should throw 404 error', () => {
      try {
        service.search(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(
          `There is no movie released after year : 999`,
        );
      }
    });
  });
});
