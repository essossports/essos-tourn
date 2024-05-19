import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDetailComponent } from './previous-detail.component';

describe('PreviousDetailComponent', () => {
  let component: PreviousDetailComponent;
  let fixture: ComponentFixture<PreviousDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
