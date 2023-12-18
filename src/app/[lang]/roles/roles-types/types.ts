import { type RoleReadPermissions } from '@/components/layouts/app-layout/_components/app-sidebar/_components/request-menudata';

export type RolesModulesPermission = {
  module: RoleReadPermissions
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
