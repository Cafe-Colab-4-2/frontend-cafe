import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoclienteComponent } from './nuevocliente.component';

describe('NuevoclienteComponent', () => {
  let component: NuevoclienteComponent;
  let fixture: ComponentFixture<NuevoclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
