import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CavaleteListComponent } from './cavalete-list.component';

describe('CavaleteListComponent', () => {
  let component: CavaleteListComponent;
  let fixture: ComponentFixture<CavaleteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CavaleteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CavaleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
