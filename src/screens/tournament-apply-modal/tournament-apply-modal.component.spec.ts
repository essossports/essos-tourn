import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentApplyModalComponent } from './tournament-apply-modal.component';

describe('TournamentApplyModalComponent', () => {
  let component: TournamentApplyModalComponent;
  let fixture: ComponentFixture<TournamentApplyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentApplyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournamentApplyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
