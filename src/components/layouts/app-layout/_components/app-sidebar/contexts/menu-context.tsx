'use client';
import React, { createContext, useState } from 'react';
import { type MenuContextProps } from '@/components/global-types/layout';
import { type ChildContainerProps } from '../../../types/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const MenuContext = createContext({} as MenuContextProps);

export function MenuProvider ({ children }: ChildContainerProps) {
  const [activeMenu, setActiveMenu] = useState('');

  const value = {
    activeMenu,
    setActiveMenu
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
