import { TestBed } from '@angular/core/testing';

import { MazeGenerationService } from './maze-generation.service';

describe('MazeGenerationService', () => {
  let service: MazeGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazeGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
