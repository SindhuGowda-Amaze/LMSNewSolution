import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsDashboardComponent } from './support-tickets-dashboard.component';

describe('SupportTicketsDashboardComponent', () => {
  let component: SupportTicketsDashboardComponent;
  let fixture: ComponentFixture<SupportTicketsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportTicketsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
