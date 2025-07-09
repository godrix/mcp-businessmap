export interface CardSubtasks {
  data: Datum[];
}
export interface CardSubtask {
  data: Datum;
}

interface Datum {
  subtask_id: number;
  description: string;
  owner_user_id: number;
  deadline: string;
  finished_at: string;
  position: number;
  attachments: Attachment[];
}

interface Attachment {
  id: number;
  file_name: string;
  link: string;
  position: number;
}
