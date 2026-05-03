import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesComponent } from './inscripciones-component';

describe('InscripcionesComponent', () => {
  let component: InscripcionesComponent;
  let fixture: ComponentFixture<InscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
