import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarRolComponent } from './consultar-rol.component';

describe('ConsultarRolComponent', () => {
  let component: ConsultarRolComponent;
  let fixture: ComponentFixture<ConsultarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
