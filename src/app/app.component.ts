import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MazeRoomDeckComponent } from './features/maze-room-deck/maze-room-deck.component';
import { MazeLabHeaderComponent } from './features/maze-lab-header/maze-lab-header.component';
import { MazeLabFooterComponent } from './features/maze-lab-footer/maze-lab-footer.component';
import { MazeGenerationAlgorithm } from './services/MazeGenerationAlgorithm';
import { DEFAULT_MAZE_WIDTH, DEFAULT_MAZE_HEIGHT } from './maze-lab-constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MazeRoomDeckComponent,
    MazeLabHeaderComponent,
    MazeLabFooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public selectedMazeGenerationAlgorithm: MazeGenerationAlgorithm =
    MazeGenerationAlgorithm.AllConnected;
  public lastMazeRefreshTime: number = Date.now();
  public mazeWidth: number = DEFAULT_MAZE_WIDTH;
  public mazeHeight: number = DEFAULT_MAZE_HEIGHT;

  title = 'maze-lab';

  public updateUsedMazeGenerationAlgorithm(algorithm: MazeGenerationAlgorithm) {
    this.selectedMazeGenerationAlgorithm = algorithm;
    this.lastMazeRefreshTime = Date.now();
  }

  public updateMazeWidth(mazeWidth: number) {
    this.mazeWidth = mazeWidth;
    this.lastMazeRefreshTime = Date.now();
  }

  public updateMazeHeight(mazeHeight: number) {
    this.mazeHeight = mazeHeight;
    this.lastMazeRefreshTime = Date.now();
  }
}
