import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTrackerCategoriesComponent } from './income-tracker-categories.component';

describe('CategoriesComponent', () => {
  let component: IncomeTrackerCategoriesComponent;
  let fixture: ComponentFixture<IncomeTrackerCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeTrackerCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTrackerCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
