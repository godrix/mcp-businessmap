export interface CardComment {
  data: Datum[];
}

interface Datum {
  comment_id: number;
  type: string;
  text: string;
  attachments: any[];
  created_at: string;
  last_modified: string;
  author: Author;
}

interface Author {
  type: string;
  value: number;
}

export interface CardCommentResponsePost {
  data: DataResponsePost;
}

interface DataResponsePost {
  type: string;
  text: string;
  attachments: any[];
  created_at: string;
  last_modified: string;
  author: Author;
  comment_id: number;
}
