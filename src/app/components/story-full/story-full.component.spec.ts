import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFullComponent } from './story-full.component';

describe('StoryFullComponent', () => {
  let component: StoryFullComponent;
  let fixture: ComponentFixture<StoryFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryFullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
