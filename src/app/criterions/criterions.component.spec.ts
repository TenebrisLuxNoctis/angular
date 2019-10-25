import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionsComponent } from './criterions.component';

describe('TableListComponent', () => {
  let component: CriterionsComponent;
  let fixture: ComponentFixture<CriterionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
