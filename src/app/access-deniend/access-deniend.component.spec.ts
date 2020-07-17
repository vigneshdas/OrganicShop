import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniendComponent } from './access-deniend.component';

describe('AccessDeniendComponent', () => {
  let component: AccessDeniendComponent;
  let fixture: ComponentFixture<AccessDeniendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessDeniendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
