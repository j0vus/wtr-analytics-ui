import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopographyDetailsComponent } from './topography-details.component';

describe('TopographyDetailsComponent', () => {
  let component: TopographyDetailsComponent;
  let fixture: ComponentFixture<TopographyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopographyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopographyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
