import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FavoritesComponent } from './favorites.component';
import { CharactersService } from '../../services/characters.service';

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let componente: FavoritesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [RouterTestingModule],
      providers: [CharactersService],
    });

    fixture = TestBed.createComponent(FavoritesComponent);
    componente = fixture.componentInstance;
  });

  it('deve navegar para "/home" ao chamar a função navigate', () => {
    spyOn(componente.router, 'navigateByUrl');
    componente.navigate();
    expect(componente.router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('deve renderizar um botão de navegação para "/home"', () => {
    fixture.detectChanges();
    const navigateButton = fixture.debugElement.query(
      By.css('.navigate-button')
    );
    expect(navigateButton.nativeElement.getAttribute('href')).toBe('/home');
  });
});
