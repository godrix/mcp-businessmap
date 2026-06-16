export interface Workspaces {
  data: WorkspaceDatum[];
}

export interface Workspace {
  data: WorkspaceDatum;
}

export interface WorkspaceDatum {
  workspace_id?: number;
  type: number;
  is_archived: number;
  name: string;
}
