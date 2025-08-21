import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAnimationComponent } from './auth-animation.component';

describe('AuthAnimationComponent', () => {
  let component: AuthAnimationComponent;
  let fixture: ComponentFixture<AuthAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAnimationComponent]
    });
    fixture = TestBed.createComponent(AuthAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
