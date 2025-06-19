import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MazeRoomComponent } from './features/maze-room/maze-room.component';
import { MazeRoomDeckComponent } from './features/maze-room-deck/maze-room-deck.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MazeRoomDeckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'maze-lab';
}
