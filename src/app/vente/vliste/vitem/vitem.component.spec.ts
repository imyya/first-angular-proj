import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitemComponent } from './vitem.component';

describe('VitemComponent', () => {
  let component: VitemComponent;
  let fixture: ComponentFixture<VitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VitemComponent]
    });
    fixture = TestBed.createComponent(VitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
