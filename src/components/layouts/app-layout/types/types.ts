import { type NextPage } from 'next';
import { type Dispatch, type HTMLAttributeAnchorTarget, type MutableRefObject, type ReactElement, type ReactNode, type SetStateAction } from 'react';

/* Next & Layout Types */
export type Page<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
};

/* AppTopbar Types */
export type NodeRef = MutableRefObject<ReactNode>;
export type AppTopbarRef = {
  menubutton?: HTMLButtonElement | null
  topbarmenu?: HTMLDivElement | null
  topbarmenubutton?: HTMLButtonElement | null
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

export type ChildContainerProps = {
  children: ReactNode
}

export type MenuModel = {
  badge?: string
  label: string
  icon?: string
  items?: MenuModel[]
  to?: string
  url?: string
  target?: HTMLAttributeAnchorTarget
  seperator?: boolean
}

type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  item: unknown
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

export type MenuContextProps = {
  activeMenu: string
  setActiveMenu: Dispatch<SetStateAction<string>>
}
