import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeLabHeaderComponent } from './maze-lab-header.component';

describe('MazeLabHeaderComponent', () => {
  let component: MazeLabHeaderComponent;
  let fixture: ComponentFixture<MazeLabHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeLabHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeLabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
