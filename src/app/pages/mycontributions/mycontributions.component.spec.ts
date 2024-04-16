import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycontributionsComponent } from './mycontributions.component';

describe('MycontributionsComponent', () => {
  let component: MycontributionsComponent;
  let fixture: ComponentFixture<MycontributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycontributionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycontributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
