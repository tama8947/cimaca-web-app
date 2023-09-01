"use client";
import Link from "next/link";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { classNames } from "primereact/utils";
import { LayoutContext } from "../../contexts/layout-context";
import { AppTopbarRef } from "../../types/types";
import { Menu } from "primereact/menu";
import "./styles/_topbar.scss";
import { menuLoginData } from "./custom-data/menus-data";

const AppTopBar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  const loginMenu = useRef<Menu>(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        {/* <Image
          src={`/layout/images/logo-${
            layoutConfig?.colorScheme !== "light" ? "white" : "dark"
          }.svg`}
          width="47.22"
          height={"35"}
          alt="logo"
        /> */}
        <span>SAKAI</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        // onClick={() => alert("click")}
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active":
            layoutState?.profileSidebarVisible,
        })}
      >
        <Menu popup ref={loginMenu} model={menuLoginData}></Menu>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>
        <button
          type="button"
          onClick={(e) => loginMenu.current?.toggle(e)}
          className="p-link layout-topbar-button"
        >
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>
        <Link href="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
});

AppTopBar.displayName = "AppTopbar";
export default AppTopBar;
