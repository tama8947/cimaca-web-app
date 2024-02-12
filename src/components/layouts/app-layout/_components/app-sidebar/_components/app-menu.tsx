'use client';

import Link from 'next/link';
import { MenuProvider } from '../contexts/menu-context';
import { appMenuData } from '../custom-data/app-menu-data';
import AppMenuItemMap from './app-menu-item';
import { useGetMenuData } from './request-menudata';
import { type AppMenuItem } from '@/global-types/layout';

export default function AppMenu () {
  const { data, isLoading } = useGetMenuData();

  const modules = () => [{
    label : 'Modules',
    items : data?.map<AppMenuItem>((module) => ({
      label: module.module.label, icon: module.module.icon, to: module.module.url
    }))
  }];

  const loading: AppMenuItem[] = [{ label: 'Loading...', icon: 'pi pi-spin pi-spinner', disabled: true }];

  return (
    <MenuProvider>
      <ul className="layout-menu">

        {appMenuData.concat(isLoading ? loading : modules()).map((item, i) => {
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

        </Link>
      </ul>
    </MenuProvider>
  );
};
