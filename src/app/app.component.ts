import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MazeRoomDeckComponent } from './features/maze-room-deck/maze-room-deck.component';
import { MazeLabHeaderComponent } from './features/maze-lab-header/maze-lab-header.component';
import { MazeLabFooterComponent } from './features/maze-lab-footer/maze-lab-footer.component';
import { MazeGenerationAlgorithm } from './services/MazeGenerationAlgorithm';

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

  title = 'maze-lab';

  public updateUsedMazeGenerationAlgorithm(algorithm: MazeGenerationAlgorithm) {
    this.selectedMazeGenerationAlgorithm = algorithm;
    this.lastMazeRefreshTime = Date.now();
  }
}
