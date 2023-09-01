"use client";
import React, { useContext } from "react";
import { LayoutContext } from "../../../contexts/layout-context";

import { MenuProvider } from "../contexts/menu-context";
import AppMenuItemMap from "./app-menu-item";
import Link from "next/link";
import { appMenuData } from "./app-menu-data";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {appMenuData.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuItemMap
              item={item}
              root={true}
              index={i}
              key={item.label}
            />
          ) : (
            <li className="menu-separator"></li>
          );
        })}

        <Link
          href="https://blocks.primereact.org"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          {/* <img
            alt="Prime Blocks"
            className="w-full mt-3"
            src={`/layout/images/banner-primeblocks${
              layoutConfig.colorScheme === "light" ? "" : "-dark"
            }.png`}
          /> */}
        </Link>
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
