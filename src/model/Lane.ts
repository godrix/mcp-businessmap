export interface Lanes {
  data: Lane[];
}

export interface LaneResponse {
  data: Lane;
}

export interface Lane {
  lane_id?: number;
  workflow: number;
  position: number;
  name: string;
  description: string;
  color: string;
}

export interface CreateLaneParams {
  workflow_id: number;
  position: number;
  name: string;
  description?: string | null;
  color: string;
}
