import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Room } from '../../services/Room';

@Component({
  selector: 'app-maze-room',
  standalone: true,
  imports: [],
  templateUrl: './maze-room.component.html',
  styleUrl: './maze-room.component.css',
})
export class MazeRoomComponent implements AfterViewInit {
  // a reference to the canvas element from our template
  @ViewChild('stage') public canvas!: ElementRef;
  private cx!: CanvasRenderingContext2D;

  // setting a width and height for the canvas
  @Input() public width!: number;
  @Input() public height!: number;
  @Input() public room!: Room;

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) {
      throw new Error('No canvas context available!');
    }
    // set some default properties about the line
    ctx.lineWidth = 1;

    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(String(this.room.id), 10, 10);

    // Draw a horizontal line
    ctx.beginPath();
    ctx.moveTo(0, 10); // Start at (10, 50)
    ctx.lineTo(19, 10); // Draw to (200, 50)
    ctx.stroke();
  }
}
