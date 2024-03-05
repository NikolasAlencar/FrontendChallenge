import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { CharactersService } from '../../services/characters.service';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let componente: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatInputModule, ReactiveFormsModule],
      providers: [CharactersService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    componente = fixture.componentInstance;
  });

  it('deve retornar true ao chamar isScrolledToBottom no final da página', () => {
    spyOnProperty(window, 'innerHeight').and.returnValue(500);
    spyOnProperty(window, 'scrollY').and.returnValue(100);
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      600
    );

    const result = componente.isScrolledToBottom();

    expect(result).toBe(true);
  });

  it('deve retornar false ao chamar isScrolledToBottom não no final da página', () => {
    spyOnProperty(window, 'innerHeight').and.returnValue(500);
    spyOnProperty(window, 'scrollY').and.returnValue(100);
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      400
    );

    const result = componente.isScrolledToBottom();

    expect(result).toBe(false);
  });
});
