import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyValuePipe, NgFor } from '@angular/common';
import { MazeGenerationAlgorithm } from '../../services/MazeGenerationAlgorithm';
import { ReplaceUppercasePipe } from '../../pipes/replace-uppercase.pipe';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  DEFAULT_MAZE_WIDTH,
  DEFAULT_MAZE_HEIGHT,
} from '../../maze-lab-constants';

@Component({
  selector: 'app-maze-lab-footer',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ReplaceUppercasePipe, ReactiveFormsModule],
  templateUrl: './maze-lab-footer.component.html',
  styleUrl: './maze-lab-footer.component.css',
})
export class MazeLabFooterComponent {
  MazeGenerationAlgorithm = MazeGenerationAlgorithm;
  selectedMazeGenerationAlgorithm: MazeGenerationAlgorithm =
    MazeGenerationAlgorithm.AllConnected;

  algorithmControl = new FormControl(this.MazeGenerationAlgorithm.AllConnected);

  @Output() mazeAlgorithmChanged = new EventEmitter<MazeGenerationAlgorithm>();
  @Output() mazeWidthChanged = new EventEmitter<number>();
  @Output() mazeHeightChanged = new EventEmitter<number>();

  @Input()
  public mazeWidth: number = DEFAULT_MAZE_WIDTH;
  @Input()
  public mazeHeight: number = DEFAULT_MAZE_HEIGHT;

  onMazeWidthChange(event: Event) {
    this.mazeWidth = +(event.target as HTMLInputElement).value;
    this.mazeWidthChanged.emit(this.mazeWidth);
  }

  onMazeHeightChange(event: Event) {
    this.mazeHeight = +(event.target as HTMLInputElement).value;
    this.mazeHeightChanged.emit(this.mazeHeight);
  }

  onAlgorithmChange() {
    const value = this.algorithmControl.value as MazeGenerationAlgorithm;
    this.selectedMazeGenerationAlgorithm = value;
    this.mazeAlgorithmChanged.emit(value);
  }

  onRegenerateMaze() {
    this.mazeAlgorithmChanged.emit(this.selectedMazeGenerationAlgorithm);
  }
}
