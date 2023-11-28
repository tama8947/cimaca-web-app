export type Category = {
  id: string
  created_at: string
  updated_at: string
  state: string
  domain: string
  range_value: string
  description: string
  optional: string
}

export type Movement = {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  amount: number
  category_id: string
  comment: string
  category: Category | undefined
}
