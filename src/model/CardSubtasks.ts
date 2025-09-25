export interface CardSubtasks {
  data: CardSubtaskWithId[];
}

export interface CardSubtask {
  data: CardSubtaskWithId;
}

export interface CardSubtaskWithId {
  subtask_id: number;
  description: string;
  owner_user_id?: number;
  deadline?: string | null;
  finished_at?: string | null;
  position: number;
  attachments: CardAttachmentWithPosition[];
}

export interface CardAttachmentWithPosition {
  id: number;
  file_name: string;
  link: string;
  position: number;
}
