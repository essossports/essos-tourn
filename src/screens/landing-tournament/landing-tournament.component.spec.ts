import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTournamentComponent } from './landing-tournament.component';

describe('LandingTournamentComponent', () => {
  let component: LandingTournamentComponent;
  let fixture: ComponentFixture<LandingTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTournamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
