"use client";

import { useContext, useEffect, useRef } from "react";

import { useMountEffect, useUnmountEffect } from "primereact/hooks";
import PrimeReact from "primereact/api";

import React from "react";
import {
  AppTopbarRef,
  ChildContainerProps,
  Page,
} from "@/components/layouts/AppLayout/types/types";
import {
  useMenuOutsideClickListener,
  useProfileMenuOutsideClickListener,
} from "./events/layout_event_listeners";
import { blockBodyScroll } from "./functions/layout_actions";
import { containerClass } from "./functions/layout_css_dynamic_class";
import { LayoutContext } from "./contexts/layout-context";
import AppTopBar from "./_components/AppTopbar/AppTopbar";
import AppSidebar from "./_components/AppSidebar/AppSidebar";

type Props = ChildContainerProps & {
  Component: Page;
};

const Layout = ({ children }: ChildContainerProps) => {
  const { layoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);
  const topbarRef = useRef<AppTopbarRef>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
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
    bindMenuOutsideClickListener,
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
};

export default Layout;
