import { Component, EventEmitter, Output } from '@angular/core';
import { KeyValuePipe, NgFor } from '@angular/common';
import { MazeGenerationAlgorithm } from '../../services/MazeGenerationAlgorithm';
import { ReplaceUppercasePipe } from '../../pipes/replace-uppercase.pipe';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
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

  onAlgorithmChange() {
    const value = this.algorithmControl.value as MazeGenerationAlgorithm;
    this.selectedMazeGenerationAlgorithm = value;
    this.mazeAlgorithmChanged.emit(value);
  }

  onRegenerateMaze() {
    this.mazeAlgorithmChanged.emit(this.selectedMazeGenerationAlgorithm);
  }
}
