import { LayoutState } from "../types/types";
import { LayoutContextProps } from "@/components/global-types/layout";

// useEffect(() => {
//   const url = pathname + searchParams.toString();
//   // console.log(searchParams.getAll);
//   if (router) {
//     hideMenu();
//     hideProfileMenu();
//   }
// }, [router]);


export const unblockBodyScroll = (): void => {
  if (document.body.classList) {
    document.body.classList.remove("blocked-scroll");
  } else {
    document.body.className = document.body.className.replace(
      new RegExp(
        "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
        "gi"
      ),
      " "
    );
  }
};

export const blockBodyScroll = (): void => {
  if (document.body.classList) {
    document.body.classList.add("blocked-scroll");
  } else {
    document.body.className += " blocked-scroll";
  }
};

type ParamsHideProfileMenu = {
  setLayoutState: LayoutContextProps["setLayoutState"];
  unbindProfileMenuOutsideClickListener: () => void;
};
export const hideProfileMenu = (
  paramsHideProfileMenu: ParamsHideProfileMenu
) => {
  paramsHideProfileMenu.setLayoutState((prevLayoutState: LayoutState) => ({
    ...prevLayoutState,
    profileSidebarVisible: false,
  }));
  paramsHideProfileMenu.unbindProfileMenuOutsideClickListener();
};

type ParamsHideMenu = {
  setLayoutState: LayoutContextProps["setLayoutState"];
  unbindMenuOutsideClickListener: () => void;
};
export const hideMenu = (paramsHideMenu: ParamsHideMenu) => {
  paramsHideMenu.setLayoutState((prevLayoutState: LayoutState) => ({
    ...prevLayoutState,
    overlayMenuActive: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  }));
  paramsHideMenu.unbindMenuOutsideClickListener();
  unblockBodyScroll();
};
