export interface User {
  data: Data;
}

interface Data {
  user_id: number;
  email: string;
  username: string;
  realname: string;
  avatar: string;
  is_tfa_enabled: number;
  is_enabled: number;
  is_confirmed: number;
  registration_date: string;
  timezone: string;
  language: string;
}
