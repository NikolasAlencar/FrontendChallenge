import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './alert.service';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

describe('AlertService', () => {
  let service: AlertService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [AlertService],
    });

    service = TestBed.inject(AlertService);
    dialog = TestBed.inject(MatDialog);
  });

  it('deve chamar dialog.open ao chamar showMessageError', () => {
    spyOn(dialog, 'open');

    service.showMessageError('Test error message');

    expect(dialog.open).toHaveBeenCalledWith(ErrorMessageComponent, {
      data: {
        errorMessage: 'Test error message',
        closeDialog: jasmine.any(Function),
      },
    });
  });

  it('deve fechar todos os diálogos ao chamar closeDialog', () => {
    spyOn(dialog, 'closeAll');

    const closeDialogFunction = jasmine.createSpy('closeDialogFunction');
    service.showMessageError('Test error message');
    const dialogRef = dialog.open(ErrorMessageComponent, {
      data: {
        errorMessage: 'Test error message',
        closeDialog: closeDialogFunction,
      },
    });

    closeDialogFunction();

    expect(dialog.closeAll).toHaveBeenCalled();
    expect(dialogRef.componentInstance.data.closeDialog).toHaveBeenCalled();
  });
});
