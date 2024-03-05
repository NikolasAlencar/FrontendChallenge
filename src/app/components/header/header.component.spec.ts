import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { CharactersService } from '../../services/characters.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let componente: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [CharactersService],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    componente = fixture.componentInstance;
  });

  it('deve inicializar activeButton com "home"', () => {
    expect(componente.activeButton).toBe('home');
  });

  it('deve chamar isActiveButton com "white" quando o botão é ativo', () => {
    componente.activeButton = 'home';
    expect(componente.isActiveButton('home')).toBe('white');
  });

  it('deve chamar isActiveButton com "black" quando o botão não é ativo', () => {
    componente.activeButton = 'about';
    expect(componente.isActiveButton('home')).toBe('black');
  });

  it('deve chamar handleButton ao chamar isActiveButton', () => {
    spyOn(componente, 'handleButton');
    componente.isActiveButton('home');
    expect(componente.handleButton).toHaveBeenCalledWith('home');
  });
});
