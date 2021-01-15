import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CavaleteFormComponent } from './cavalete-form.component';

describe('CavaleteFormComponent', () => {
  let component: CavaleteFormComponent;
  let fixture: ComponentFixture<CavaleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CavaleteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CavaleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
