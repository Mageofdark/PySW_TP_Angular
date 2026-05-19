import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto2Component } from './punto2';

describe('Punto2Component', () => {
  let component: Punto2Component;
  let fixture: ComponentFixture<Punto2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Punto2Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
