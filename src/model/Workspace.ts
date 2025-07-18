
export interface Workspace {
  data: Datum;
}

interface Datum {
  type: number;
  is_archived: number;
  name: string;
}
