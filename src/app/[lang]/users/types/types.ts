import { type Module } from '@/components/layouts/app-layout/_components/app-sidebar/_components/request-menudata';

export type RolesModulesPermission = {
  module: Module
  module_id: string
  permissions: string[]
  role_id: string
}

export type Role = {
  created_at: Date
  id: string
  name: string
  roles_modules_permissions: RolesModulesPermission[]
  updated_at: Date
}

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
