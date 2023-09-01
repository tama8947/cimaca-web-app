import { useEventListener } from "primereact/hooks";
import { AppTopbarRef, LayoutContextProps } from "../types/types";
import { RefObject } from "react";
import { hideMenu, hideProfileMenu } from "../functions/layout_actions";

export const useProfileMenuOutsideClickListener = (
  topbarRef: RefObject<AppTopbarRef>,
  setLayoutState: LayoutContextProps["setLayoutState"]
) => {
  const [
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
  ] = useEventListener({
    type: "click",
    listener: (event) => {
      console.log("click");
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target as Node)
      );

      if (isOutsideClicked) {
        hideProfileMenu({
          setLayoutState,
          unbindProfileMenuOutsideClickListener,
        });
      }
    },
  });
  return {
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
    hideProfileMenu: () =>
      hideProfileMenu({
        setLayoutState,
        unbindProfileMenuOutsideClickListener,
      }),
  };
};

type ReferencesLayout = {
  sidebarRef: RefObject<HTMLDivElement>;
  topbarRef: RefObject<AppTopbarRef>;
};
export const useMenuOutsideClickListener = (
  { topbarRef, sidebarRef }: ReferencesLayout,
  setLayoutState: LayoutContextProps["setLayoutState"]
) => {
  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu({ setLayoutState, unbindMenuOutsideClickListener });
        }
      },
    });
  return {
    bindMenuOutsideClickListener,
    unbindMenuOutsideClickListener,
    hideMenu: () =>
      hideMenu({ setLayoutState, unbindMenuOutsideClickListener }),
  };
};
