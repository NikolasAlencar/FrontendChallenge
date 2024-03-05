import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService],
    });

    service = TestBed.inject(CharactersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('deve retornar o sinal correto para personagens, favoritos e carregamento de paginação', () => {
    const charactersSignal = service.getCharacters();
    const favoriteCharactersSignal = service.getFavoriteCharacters();
    const loadingPaginationSignal = service.getLoadingPagination();

    expect(charactersSignal).toBe(service.characters);
    expect(favoriteCharactersSignal).toBe(service.favoriteCharacters);
    expect(loadingPaginationSignal).toBe(service.loadingPagination);
  });
});
