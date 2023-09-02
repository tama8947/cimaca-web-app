import { type NextPage } from 'next';
// import { Toast } from 'primereact/toast';
import { type Dispatch, type HTMLAttributeAnchorTarget, type ReactElement, type ReactNode, type SetStateAction } from 'react';
import type React from 'react';

/* Next & Layout Types */
type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

/* Breadcrumb Types */
export interface AppBreadcrumbProps {
  className?: string
}

export interface Breadcrumb {
  labels?: string[]
  to?: string
}

export interface BreadcrumbItem {
  label: string
  to?: string
  items?: BreadcrumbItem[]
}

/* Context Types */
export interface LayoutState {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
}

export interface LayoutConfig {
  ripple: boolean
  inputStyle: string
  menuMode: string
  colorScheme: string
  theme: string
  scale: number
}

export interface LayoutContextProps {
  layoutConfig: LayoutConfig
  setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>
  layoutState: LayoutState
  setLayoutState: Dispatch<SetStateAction<LayoutState>>
  onMenuToggle: () => void
  showProfileSidebar: () => void
}

export interface MenuContextProps {
  activeMenu: string
  setActiveMenu: Dispatch<SetStateAction<string>>
}

/* AppConfig Types */
export interface AppConfigProps {
  simple?: boolean
}

/* AppMenu Types */
interface CommandProps {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  item: MenuModelItem
}

export interface MenuModel {
  label: string
  icon?: string
  items?: MenuModel[]
  to?: string
  url?: string
  target?: HTMLAttributeAnchorTarget
  seperator?: boolean
}

export interface MenuProps {
  model: MenuModel[]
}

export interface AppMenuItem extends MenuModel {
  items?: AppMenuItem[]
  badge?: 'UPDATED' | 'NEW'
  badgeClass?: string
  class?: string
  preventExact?: boolean
  visible?: boolean
  disabled?: boolean
  replaceUrl?: boolean
  command?: ({ originalEvent, item }: CommandProps) => void
}

export interface AppMenuItemProps {
  item?: AppMenuItem
  parentKey?: string
  index?: number
  root?: boolean
  className?: string
}
