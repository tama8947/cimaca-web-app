'use client';

import { type Context, createContext, useState } from 'react';
import { type ChildContainerProps, type MenuContextProps } from '../../../types/types';

/* eslint-disable */
export const MenuContext: Context<MenuContextProps> = createContext< MenuContextProps>({} as MenuContextProps);
/* eslint-enable */

export function MenuProvider ({ children }: ChildContainerProps) {
  const [activeMenu, setActiveMenu] = useState('');

  const value = {
    activeMenu,
    setActiveMenu
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
