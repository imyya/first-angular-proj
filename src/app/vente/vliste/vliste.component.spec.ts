import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlisteComponent } from './vliste.component';

describe('VlisteComponent', () => {
  let component: VlisteComponent;
  let fixture: ComponentFixture<VlisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlisteComponent]
    });
    fixture = TestBed.createComponent(VlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
