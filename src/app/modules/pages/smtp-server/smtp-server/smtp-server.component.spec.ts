import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpServerComponent } from './smtp-server.component';

describe('SmtpServerComponent', () => {
  let component: SmtpServerComponent;
  let fixture: ComponentFixture<SmtpServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
