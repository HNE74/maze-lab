import { Injectable } from '@angular/core';
import { Room } from './Room';
import { MazeGenerationAlgorithm } from './MazeGenerationAlgorithm';

@Injectable({
  providedIn: 'root',
})
export class MazeGenerationService {
  constructor() {}

  public generateRoomDeckMaze(
    width: number,
    height: number,
    algorithm: MazeGenerationAlgorithm
  ): Room[][] {
    if (algorithm === MazeGenerationAlgorithm.AllConnected) {
      return this.generateWithAllConnected(height, width);
    } else if (algorithm == MazeGenerationAlgorithm.RecursiveBacktracking) {
      return this.generateWithRecursiveBacktracking(height, width);
    } else if (algorithm == MazeGenerationAlgorithm.BinaryTree) {
      return this.generateWithBinaryTree(height, width);
    } else {
      throw new Error(
        `Maze generation algorithm ${algorithm} is not implemented yet.`
      );
    }
  }

  private generateWithRecursiveBacktracking(
    height: number,
    width: number
  ): Room[][] {
    const deck: Room[][] = this.initMazeDeck(height, width);

    // Helper to shuffle directions
    function shuffle<T>(array: T[]): T[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Track visited cells
    const visited: boolean[][] = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );

    function carve(x: number, y: number) {
      visited[y][x] = true;
      const directions = shuffle([
        { dx: 0, dy: -1, dir: 'north', opp: 'south' },
        { dx: 1, dy: 0, dir: 'east', opp: 'west' },
        { dx: 0, dy: 1, dir: 'south', opp: 'north' },
        { dx: -1, dy: 0, dir: 'west', opp: 'east' },
      ]);

      for (const { dx, dy, dir, opp } of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited[ny][nx]
        ) {
          // Connect rooms in both directions
          (deck[y][x] as any)[dir] = deck[ny][nx];
          (deck[ny][nx] as any)[opp] = deck[y][x];
          carve(nx, ny);
        }
      }
    }

    carve(0, 0); // Start at (0, 0)
    return deck;
  }

  private generateWithAllConnected(height: number, width: number): Room[][] {
    let cnt: number = 0;
    let deck: Room[][] = this.initMazeDeck(height, width);

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
        deck[y][x].north = deck[y - 1][x];
        deck[y][x].south = deck[y + 1][x];
        deck[y][x].west = deck[y][y - 1];
        deck[y][x].east = deck[y][y + 1];
      }
    }

    return deck;
  }

  private initMazeDeck(height: number, width: number) {
    let deck: Room[][] = [];
    let cnt: number = 0;
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

    return deck;
  }

  private generateWithBinaryTree(height: number, width: number): Room[][] {
    const deck: Room[][] = this.initMazeDeck(height, width);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const room = deck[y][x];
        const neighbors: { dir: 'north' | 'east'; nx: number; ny: number }[] =
          [];

        // Check if north neighbor exists
        if (y > 0) {
          neighbors.push({ dir: 'north', nx: x, ny: y - 1 });
        }
        // Check if east neighbor exists
        if (x < width - 1) {
          neighbors.push({ dir: 'east', nx: x + 1, ny: y });
        }

        if (neighbors.length > 0) {
          // Randomly pick one neighbor (north or east)
          const chosen =
            neighbors[Math.floor(Math.random() * neighbors.length)];
          if (chosen.dir === 'north') {
            room.north = deck[chosen.ny][chosen.nx];
            deck[chosen.ny][chosen.nx].south = room;
          } else if (chosen.dir === 'east') {
            room.east = deck[chosen.ny][chosen.nx];
            deck[chosen.ny][chosen.nx].west = room;
          }
        }
      }
    }
    return deck;
  }
}
