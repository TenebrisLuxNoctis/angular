import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCriterionComponent } from './create-criterion.component';

describe('CreateCriterionComponent', () => {
  let component: CreateCriterionComponent;
  let fixture: ComponentFixture<CreateCriterionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCriterionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
