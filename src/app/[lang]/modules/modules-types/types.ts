export type RolesModulesPermission = {
  module_id: string
  permissions: string[]
  role_id: string
}

export type Module = {
  id: string
  label: string
  name: string
  parent_id?: null
  roles_modules_permissions?: RolesModulesPermission[]
  created_at?: Date
  updated_at?: Date
  url?: string
  icon?: string
}

export type DataForTable = {
  data: Module[]
  totalRecords: number
}
