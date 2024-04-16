import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateStoryComponent } from './private-story.component';

describe('PrivateStoryComponent', () => {
  let component: PrivateStoryComponent;
  let fixture: ComponentFixture<PrivateStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
