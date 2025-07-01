import { Component, Input } from '@angular/core';
import { Room } from '../../services/Room';
import { MazeGenerationService } from '../../services/maze-generation.service';
import { MazeRoomComponent } from '../maze-room/maze-room.component'; // Adjust path if needed
import { NgFor, NgIf } from '@angular/common';
import { MazeGenerationAlgorithm } from '../../services/MazeGenerationAlgorithm';
import {
  DEFAULT_MAZE_WIDTH,
  DEFAULT_MAZE_HEIGHT,
} from '../../maze-lab-constants';

@Component({
  selector: 'app-maze-room-deck',
  standalone: true,
  imports: [MazeRoomComponent, NgIf, NgFor],
  templateUrl: './maze-room-deck.component.html',
  styleUrl: './maze-room-deck.component.css',
})
export class MazeRoomDeckComponent {
  @Input() mazeGenerationAlgorithm: MazeGenerationAlgorithm =
    MazeGenerationAlgorithm.AllConnected;

  @Input() lastMazeRefreshTime?: number;

  @Input() mazeWidth: number = DEFAULT_MAZE_WIDTH;
  @Input() mazeHeight: number = DEFAULT_MAZE_HEIGHT;

  deck!: Room[][];

  constructor(private mazeGenerationService: MazeGenerationService) {
    this.deck = mazeGenerationService.generateRoomDeckMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.mazeGenerationAlgorithm
    );
  }

  ngOnChanges() {
    this.deck = this.mazeGenerationService.generateRoomDeckMaze(
      this.mazeWidth,
      this.mazeHeight,
      this.mazeGenerationAlgorithm
    );
  }
}
