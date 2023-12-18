import { type Role } from '../../roles/roles-types/types';

export type User = {
  created_at: Date
  email: string
  email_verified: null | Date
  id: string
  image: null
  last_name: string
  name: string
  password: string
  role: Role
  role_id: string
  state: string
  updated_at: Date
  verification_token: null | string
}
