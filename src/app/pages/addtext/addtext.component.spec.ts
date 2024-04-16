import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtextComponent } from './addtext.component';

describe('AddtextComponent', () => {
  let component: AddtextComponent;
  let fixture: ComponentFixture<AddtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
