import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookEntryComponent } from './guest-book-entry.component';

describe('GuestBookEntryComponent', () => {
  let component: GuestBookEntryComponent;
  let fixture: ComponentFixture<GuestBookEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestBookEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestBookEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
