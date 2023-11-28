import { type NextPage } from 'next';
// import { Toast } from 'primereact/toast';
import { type Dispatch, type HTMLAttributeAnchorTarget, type ReactElement, type ReactNode, type SetStateAction } from 'react';
import type React from 'react';

/* Next & Layout Types */
type Page<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

/* Breadcrumb Types */
export type AppBreadcrumbProps = {
  className?: string
}

export type Breadcrumb = {
  labels?: string[]
  to?: string
}

export type BreadcrumbItem = {
  label: string
  to?: string
  items?: BreadcrumbItem[]
}

/* Context Types */
export type LayoutState = {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
}

export type LayoutConfig = {
  ripple: boolean
  inputStyle: string
  menuMode: string
  colorScheme: string
  theme: string
  scale: number
}

export type LayoutContextProps = {
  layoutConfig: LayoutConfig
  setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>
  layoutState: LayoutState
  setLayoutState: Dispatch<SetStateAction<LayoutState>>
  onMenuToggle: () => void
  showProfileSidebar: () => void
}

export type MenuContextProps = {
  activeMenu: string
  setActiveMenu: Dispatch<SetStateAction<string>>
}

/* AppConfig Types */
export type AppConfigProps = {
  simple?: boolean
}

/* AppMenu Types */
type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  item: MenuModelItem
}

export type MenuModel = {
  label: string
  icon?: string
  items?: MenuModel[]
  to?: string
  url?: string
  target?: HTMLAttributeAnchorTarget
  seperator?: boolean
}

export type MenuProps = {
  model: MenuModel[]
}

export type AppMenuItem = {
  items?: AppMenuItem[]
  badge?: 'UPDATED' | 'NEW'
  badgeClass?: string
  class?: string
  preventExact?: boolean
  visible?: boolean
  disabled?: boolean
  replaceUrl?: boolean
  command?: ({ originalEvent, item }: CommandProps) => void
} & MenuModel

export type AppMenuItemProps = {
  item?: AppMenuItem
  parentKey?: string
  index?: number
  root?: boolean
  className?: string
}
