import { Component } from '@angular/core';
import { Room } from '../../services/Room';
import { MazeGenerationService } from '../../services/maze-generation.service';
import { MazeRoomComponent } from '../maze-room/maze-room.component'; // Adjust path if needed
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-maze-room-deck',
  standalone: true,
  imports: [MazeRoomComponent, NgIf, NgFor],
  templateUrl: './maze-room-deck.component.html',
  styleUrl: './maze-room-deck.component.css',
})
export class MazeRoomDeckComponent {
  deck!: Room[][];

  constructor(private mazeGenerationService: MazeGenerationService) {
    this.deck = mazeGenerationService.generateRoomDeckMaze(5, 5);
    console.log(this.deck);
  }
}
