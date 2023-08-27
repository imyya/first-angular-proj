import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VformComponent } from './vform.component';

describe('VformComponent', () => {
  let component: VformComponent;
  let fixture: ComponentFixture<VformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VformComponent]
    });
    fixture = TestBed.createComponent(VformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
