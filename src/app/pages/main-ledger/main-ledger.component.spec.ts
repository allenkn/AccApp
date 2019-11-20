import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLedgerComponent } from './main-ledger.component';

describe('MainLedgerComponent', () => {
  let component: MainLedgerComponent;
  let fixture: ComponentFixture<MainLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
