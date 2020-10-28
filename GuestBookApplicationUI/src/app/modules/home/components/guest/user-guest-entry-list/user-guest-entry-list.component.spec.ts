import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGuestEntryListComponent } from './user-guest-entry-list.component';

describe('UserGuestEntryListComponent', () => {
  let component: UserGuestEntryListComponent;
  let fixture: ComponentFixture<UserGuestEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGuestEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGuestEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
