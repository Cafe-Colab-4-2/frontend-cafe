import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListardetalleComponent } from './listardetalle.component';

describe('ListardetalleComponent', () => {
  let component: ListardetalleComponent;
  let fixture: ComponentFixture<ListardetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListardetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListardetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
