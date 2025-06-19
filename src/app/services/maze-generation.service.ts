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
      if (x > 0) {
        deck[0][x].west = deck[0][x - 1];
      }
      if (x < width - 1) {
        deck[0][x].east = deck[0][x + 1];
      }
    }

    for (let y = 0; y < height; y++) {
      deck[y][0].east = deck[y][1];
      if (y > 0) {
        deck[y][0].north = deck[y - 1][0];
      }
      if (y < height - 1) {
        deck[y][0].south = deck[y + 1][0];
      }
    }

    for (let x = 0; x < width; x++) {
      deck[height - 1][x].north = deck[height - 2][x];
      if (x > 0) {
        deck[height - 1][x].west = deck[height - 1][x - 1];
      }
      if (x < width - 1) {
        deck[height - 1][x].east = deck[height - 1][x + 1];
      }
    }

    for (let y = 0; y < height; y++) {
      deck[y][width - 1].west = deck[y][width - 2];
      if (y > 0) {
        deck[y][width - 1].north = deck[y - 1][width - 1];
      }
      if (y < height - 1) {
        deck[y][width - 1].south = deck[y + 1][width - 1];
      }
    }

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        deck[x][y].north = deck[x][y - 1];
        deck[x][y].south = deck[x][y + 1];
        deck[x][y].west = deck[x - 1][y];
        deck[x][y].east = deck[x + 1][y];
      }
    }

    return deck;
  }
}
