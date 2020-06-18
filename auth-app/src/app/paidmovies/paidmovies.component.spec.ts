import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidmoviesComponent } from './paidmovies.component';

describe('PaidmoviesComponent', () => {
  let component: PaidmoviesComponent;
  let fixture: ComponentFixture<PaidmoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidmoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
