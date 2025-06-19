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

    const margin = 0;
    const w = this.width;
    const h = this.height;
    const openingWidth = 20;

    // Top wall (north)
    ctx.beginPath();
    if (this.room.north !== undefined) {
      const openingStart = (w - openingWidth) / 2;
      const openingEnd = openingStart + openingWidth;
      ctx.moveTo(margin, margin);
      ctx.lineTo(openingStart, margin);
      ctx.moveTo(openingEnd, margin);
      ctx.lineTo(w - margin, margin);
    } else {
      ctx.moveTo(margin, margin);
      ctx.lineTo(w - margin, margin);
    }

    // Right wall (east)
    if (this.room.east !== undefined) {
      const openingStart = (h - openingWidth) / 2;
      const openingEnd = openingStart + openingWidth;
      ctx.moveTo(w - margin, margin);
      ctx.lineTo(w - margin, openingStart);
      ctx.moveTo(w - margin, openingEnd);
      ctx.lineTo(w - margin, h - margin);
    } else {
      ctx.moveTo(w - margin, margin);
      ctx.lineTo(w - margin, h - margin);
    }

    // Bottom wall (south)
    if (this.room.south !== undefined) {
      const openingStart = (w - openingWidth) / 2;
      const openingEnd = openingStart + openingWidth;
      ctx.moveTo(w - margin, h - margin);
      ctx.lineTo(openingEnd, h - margin);
      ctx.moveTo(openingStart, h - margin);
      ctx.lineTo(margin, h - margin);
    } else {
      ctx.moveTo(w - margin, h - margin);
      ctx.lineTo(margin, h - margin);
    }

    // Left wall (west)
    if (this.room.west !== undefined) {
      const openingStart = (h - openingWidth) / 2;
      const openingEnd = openingStart + openingWidth;
      ctx.moveTo(margin, h - margin);
      ctx.lineTo(margin, openingEnd);
      ctx.moveTo(margin, openingStart);
      ctx.lineTo(margin, margin);
    } else {
      ctx.moveTo(margin, h - margin);
      ctx.lineTo(margin, margin);
    }

    ctx.stroke();
  }
}
