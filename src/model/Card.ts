export interface Card {
  data: Data;
}

interface Data {
  card_id: number;
  custom_id: null;
  board_id: number;
  workflow_id: number;
  title: string;
  owner_user_id: number;
  type_id: number;
  color: string;
  section: number;
  column_id: number;
  lane_id: number;
  position: number;
  description: string;
  size: number;
  priority: number;
  deadline: null;
  reporter: Reporter;
  created_at: string;
  revision: number;
  last_modified: string;
  in_current_position_since: string;
  first_request_time: string;
  first_start_time: string;
  first_end_time: null;
  last_request_time: string;
  last_start_time: string;
  last_end_time: null;
  is_blocked: number;
  block_reason: Blockreason;
  child_card_stats: Childcardstats;
  finished_subtask_count: number;
  unfinished_subtask_count: number;
  attachments: any[];
  cover_image: null;
  custom_fields: Customfield[];
  stickers: any[];
  tag_ids: any[];
  milestone_ids: any[];
  co_owner_ids: any[];
  watcher_ids: any[];
  annotations: any[];
  outcomes: any[];
  links_from_outcomes: any[];
  subtasks: Subtask[];
  linked_cards: any[];
}

interface Subtask {
  subtask_id: number;
  description: string;
  owner_user_id: null;
  finished_at: null;
  deadline: null;
  position: number;
  attachments: any[];
}

interface Customfield {
  field_id: number;
  other_value?: null;
  values?: Value[];
  value?: null;
  display_value?: null;
}

interface Value {
  value_id: number;
  position: number;
}

interface Childcardstats {
  child_card_size_sum: number;
  finished_bottom_child_card_size_sum: number;
  unfinished_bottom_child_card_size_sum: number;
  has_unfinished_child_cards: boolean;
  last_unfinished_child_card_deadline: null;
}

interface Blockreason {
  block_type: number;
  reason_id: number;
  comment: string;
}

interface Reporter {
  type: string;
  value: number;
}
