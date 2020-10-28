import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEntryListComponent } from './guest-entry-list.component';

describe('GuestEntryListComponent', () => {
  let component: GuestEntryListComponent;
  let fixture: ComponentFixture<GuestEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
