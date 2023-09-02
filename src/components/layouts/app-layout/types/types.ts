import { type NextPage } from 'next';
import { type Dispatch, type HTMLAttributeAnchorTarget, type MutableRefObject, type ReactElement, type ReactNode, type SetStateAction } from 'react';

/* Next & Layout Types */
export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

/* AppTopbar Types */
export type NodeRef = MutableRefObject<ReactNode>
export interface AppTopbarRef {
  menubutton?: HTMLButtonElement | null
  topbarmenu?: HTMLDivElement | null
  topbarmenubutton?: HTMLButtonElement | null
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

export interface ChildContainerProps {
  children: ReactNode
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

interface CommandProps {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  item: unknown
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
