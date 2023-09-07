'use client';
import Link from 'next/link';
import { MenuProvider } from '../contexts/menu-context';
import { appMenuData } from '../custom-data/app-menu-data';
import AppMenuItemMap from './app-menu-item';

export default function AppMenu () {
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {appMenuData.map((item, i) => {
          return item?.seperator === undefined
            ? (
            <AppMenuItemMap
              item={item}
              root={true}
              index={i}
              key={item.label}
            />
              )
            : (
            <li className="menu-separator"></li>
              );
        })}

        <Link
          href="https://blocks.primereact.org"
          target="_blank"
          style={{ cursor: 'pointer' }}
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
