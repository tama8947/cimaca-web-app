import React, { createContext, useState } from 'react';
import { type ChildContainerProps, type LayoutConfig, type LayoutContextProps, type LayoutState } from '../types/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const LayoutContext = createContext({} as LayoutContextProps);

export function LayoutProvider ({ children }: ChildContainerProps) {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple      : true,
    inputStyle  : 'outlined',
    menuMode    : 'static',
    colorScheme : 'light',
    theme       : 'lara-light-indigo',
    scale       : 14
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive : false,
    overlayMenuActive         : false,
    profileSidebarVisible     : false,
    configSidebarVisible      : false,
    staticMenuMobileActive    : false,
    menuHoverActive           : false
  });

  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay';
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const onMenuToggle = () => {
    console.log('click');
    if (isOverlay()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive
      }));
    }

    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
      }));
    }
  };

  const showProfileSidebar = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: !prevLayoutState.profileSidebarVisible
    }));
  };

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    showProfileSidebar
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
