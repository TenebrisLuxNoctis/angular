import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionExpandedComponent } from './criterion-expanded.component';

describe('CriterionExpandedComponent', () => {
  let component: CriterionExpandedComponent;
  let fixture: ComponentFixture<CriterionExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
