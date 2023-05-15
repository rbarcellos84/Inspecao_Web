import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspecaoConsultaComponent } from './inspecao-consulta.component';

describe('InspecaoConsultaComponent', () => {
  let component: InspecaoConsultaComponent;
  let fixture: ComponentFixture<InspecaoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspecaoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspecaoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
