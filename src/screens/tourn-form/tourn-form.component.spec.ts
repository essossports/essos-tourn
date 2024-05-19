import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournFormComponent } from './tourn-form.component';

describe('TournFormComponent', () => {
  let component: TournFormComponent;
  let fixture: ComponentFixture<TournFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
