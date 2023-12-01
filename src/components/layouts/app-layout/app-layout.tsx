'use client';

import PrimeReact from 'primereact/api';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import React, { useContext, useEffect, useRef } from 'react';
import AppSidebar from './_components/app-sidebar/app-sidebar';
import AppTopBar from './_components/app-topbar/app-topbar';
import { LayoutContext } from './contexts/layout-context';
import {
  useMenuOutsideClickListener,
  useProfileMenuOutsideClickListener
} from './events/layout-event-listeners';
import { blockBodyScroll } from './functions/layout-actions';
import { containerClass } from './functions/layout-css-dynamic-class';
import {
  type AppTopbarRef,
  type ChildContainerProps
} from '@/components/layouts/app-layout/types/types';

export default function Layout ({ children }: ChildContainerProps) {
  const { layoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);
  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener
  } = useProfileMenuOutsideClickListener(topbarRef, setLayoutState);

  const { bindMenuOutsideClickListener, unbindMenuOutsideClickListener } =
    useMenuOutsideClickListener({ topbarRef, sidebarRef }, setLayoutState);

  useMountEffect(() => {
    PrimeReact.ripple = true;
  });

  useEffect(() => {
    if (layoutState?.overlayMenuActive || layoutState?.staticMenuMobileActive) {
      bindMenuOutsideClickListener();
    }

    layoutState?.staticMenuMobileActive && blockBodyScroll();
  }, [
    layoutState?.overlayMenuActive,
    layoutState?.staticMenuMobileActive,
    bindMenuOutsideClickListener
  ]);

  useEffect(() => {
    if (layoutState?.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener();
    }
  }, [layoutState?.profileSidebarVisible, bindProfileMenuOutsideClickListener]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
    unbindProfileMenuOutsideClickListener();
  });

  return (
    <>
      <main className={containerClass(layoutState, layoutConfig)}>
        <div className="layout-topbar">
          <AppTopBar ref={topbarRef} />
        </div>
        <div ref={sidebarRef} className="layout-sidebar">
          <AppSidebar />
        </div>
        <div className="layout-main-container">
          <div className="layout-main">{children}</div>
        </div>
        <div className="layout-mask"></div>
      </main>
    </>
  );
}
