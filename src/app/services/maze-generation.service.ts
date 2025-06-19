import { Injectable } from '@angular/core';
import { Room } from './Room';
import { RouterLinkWithHref } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MazeGenerationService {
  constructor() {}

  public generateRoomDeckMaze(width: number, height: number): Room[][] {
    let cnt: number = 0;
    let deck: Room[][] = [];
    for (let y = 0; y < height; y++) {
      let row: Room[] = [];
      for (let x = 0; x < width; x++) {
        let room: Room = {
          id: cnt,
          north: undefined,
          south: undefined,
          west: undefined,
          east: undefined,
        };
        row.push(room);
        cnt++;
      }
      deck.push(row);
    }

    for (let x = 0; x < width; x++) {
      deck[0][x].south = deck[1][x];
    }

    for (let x = 0; x < width; x++) {
      deck[height - 1][x].north = deck[height - 2][x];
    }

    return deck;
  }
}
