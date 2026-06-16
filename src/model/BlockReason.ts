export interface BlockReasons {
  data: BlockReason[];
}

export interface BlockReason {
  reason_id: number;
  label: string;
  color?: string;
  is_enabled?: number;
}

export interface CardBlockReason {
  data: {
    reason_id?: number;
    comment?: string;
    users?: number[];
    date?: string;
  };
}
