import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspecaoCadastroComponent } from './inspecao-cadastro.component';

describe('InspecaoCadastroComponent', () => {
  let component: InspecaoCadastroComponent;
  let fixture: ComponentFixture<InspecaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspecaoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspecaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
