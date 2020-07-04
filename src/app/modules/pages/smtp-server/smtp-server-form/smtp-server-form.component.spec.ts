import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpServerFormComponent } from './smtp-server-form.component';

describe('SmtpServerFormComponent', () => {
  let component: SmtpServerFormComponent;
  let fixture: ComponentFixture<SmtpServerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpServerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpServerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
