import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarRolComponent } from './guardar-rol.component';

describe('GuardarRolComponent', () => {
  let component: GuardarRolComponent;
  let fixture: ComponentFixture<GuardarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
