export interface ApiLimits {
  data: Datum[];
}

interface Datum {
  type: string;
  limit: number;
}
