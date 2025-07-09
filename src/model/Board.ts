export interface Boards {
  data: Datum[];
}
export interface Board {
  data: Datum;
}

interface Datum {
  board_id: number;
  workspace_id: number;
  is_archived: number;
  name: string;
  description: string;
  revision: number;
}
