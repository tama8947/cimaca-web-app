import { classNames } from "primereact/utils";
import { LayoutConfig, LayoutState } from "../types/types";

export const containerClass = (
  layoutState: LayoutState,
  layoutConfig: LayoutConfig
) =>
  classNames("layout-wrapper", {
    "layout-overlay": layoutConfig?.menuMode === "overlay",
    "layout-static": layoutConfig?.menuMode === "static",
    "layout-static-inactive":
      layoutState?.staticMenuDesktopInactive &&
      layoutConfig?.menuMode === "static",
    "layout-overlay-active": layoutState?.overlayMenuActive,
    "layout-mobile-active": layoutState?.staticMenuMobileActive,
    "p-input-filled": layoutConfig?.inputStyle === "filled",
    "p-ripple-disabled": !layoutConfig?.ripple,
  });
