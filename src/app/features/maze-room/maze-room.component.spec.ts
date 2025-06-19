import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeRoomComponent } from './maze-room.component';

describe('MazeRoomComponent', () => {
  let component: MazeRoomComponent;
  let fixture: ComponentFixture<MazeRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
