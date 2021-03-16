import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevodetalleComponent } from './nuevodetalle.component';

describe('NuevodetalleComponent', () => {
  let component: NuevodetalleComponent;
  let fixture: ComponentFixture<NuevodetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevodetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
