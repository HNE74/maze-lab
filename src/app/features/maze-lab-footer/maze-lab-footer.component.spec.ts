import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeLabFooterComponent } from './maze-lab-footer.component';

describe('MazeLabFooterComponent', () => {
  let component: MazeLabFooterComponent;
  let fixture: ComponentFixture<MazeLabFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeLabFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeLabFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
