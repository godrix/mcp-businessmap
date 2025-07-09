export interface LinkedCards {
  data: Datum[];
}

interface Datum {
  card_id: number;
  position: number;
  link_type: string;
}
