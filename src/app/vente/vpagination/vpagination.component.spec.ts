import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpaginationComponent } from './vpagination.component';

describe('VpaginationComponent', () => {
  let component: VpaginationComponent;
  let fixture: ComponentFixture<VpaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VpaginationComponent]
    });
    fixture = TestBed.createComponent(VpaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
