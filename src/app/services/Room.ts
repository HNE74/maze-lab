export interface Room {
  id: number;
  north?: Room;
  south?: Room;
  west?: Room;
  east?: Room;
}
