import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMinComponent } from './story-min.component';

describe('StoryMinComponent', () => {
  let component: StoryMinComponent;
  let fixture: ComponentFixture<StoryMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryMinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
