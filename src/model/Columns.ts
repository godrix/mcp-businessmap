export interface Columns {
  data: Datum[];
}
export interface Column {
  data: Datum;
}

interface Datum {
  column_id: number;
  workflow_id: number;
  section: number;
  parent_column_id: null;
  position: number;
  name: string;
  description: string;
  color: string;
  limit: number;
  cards_per_row: number;
  flow_type: number;
  card_ordering: null;
}
