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

    // Draw a horizontal line
    const margin = 5;
    const w = this.width;
    const h = this.height;
    const openingWidth = 20;

    // Draw rectangle as before
    ctx.beginPath();
    ctx.moveTo(margin, margin);

    // Top wall with possible opening
    if (this.room.north !== undefined) {
      // Calculate opening start and end
      const openingStart = (w - openingWidth) / 2;
      const openingEnd = openingStart + openingWidth;

      // Draw left part of top wall
      ctx.lineTo(openingStart, margin);
      // Move past the opening
      ctx.moveTo(openingEnd, margin);
      // Draw right part of top wall
      ctx.lineTo(w - margin, margin);
    } else {
      ctx.lineTo(w - margin, margin);
    }

    // Continue rectangle
    ctx.lineTo(w - margin, h - margin);
    ctx.lineTo(margin, h - margin);
    ctx.lineTo(margin, margin);
    ctx.stroke();
  }
}
