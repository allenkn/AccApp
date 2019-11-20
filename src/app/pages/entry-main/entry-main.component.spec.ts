import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMainComponent } from './entry-main.component';

describe('EntryMainComponent', () => {
  let component: EntryMainComponent;
  let fixture: ComponentFixture<EntryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
