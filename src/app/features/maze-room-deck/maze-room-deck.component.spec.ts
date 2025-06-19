import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeRoomDeckComponent } from './maze-room-deck.component';

describe('MazeRoomDeckComponent', () => {
  let component: MazeRoomDeckComponent;
  let fixture: ComponentFixture<MazeRoomDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeRoomDeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeRoomDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
