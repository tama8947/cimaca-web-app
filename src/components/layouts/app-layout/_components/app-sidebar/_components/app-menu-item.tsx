'use client';
import Link from 'next/link';
import {
  usePathname
} from 'next/navigation';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { type AppMenuItemProps } from '../../../types/types';
import { MenuContext } from '../contexts/menu-context';

export default function AppMenuItemMap (props: AppMenuItemProps) {
  const { activeMenu, setActiveMenu } = useContext(MenuContext);

  const pathname = usePathname();

  const item = props.item;

  const key = props.parentKey !== undefined
    ? props.parentKey + '-' + props.index
    : String(props.index);

  const isActiveRoute = item?.to !== undefined && pathname === item?.to;

  const active = activeMenu === key || activeMenu.startsWith(key + '-');

  // useEffect(() => {
  //   if (item!.to && pathname === item!.to) {
  //     setActiveMenu(key);
  //   }

  //   const onRouteChange = (url: string) => {
  //     if (item!.to && item!.to === url) {
  //       setActiveMenu(key);
  //     }
  //   };
  //   const url = pathname + searchParams.toString();
  //   // console.log(router);

  //   // router.events.on("routeChangeComplete", onRouteChange);

  //   // return () => {
  //   //   router.events.off("routeChangeComplete", onRouteChange);
  //   // };
  //   return () => {
  //     onRouteChange(url);
  //   };
  // }, [router]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // avoid processing disabled items
    if (item?.disabled ?? false) {
      event.preventDefault();
      return;
    }

    // execute command
    if (item?.command !== undefined) {
      item?.command({ originalEvent: event, item });
    }

    // toggle active state
    if (item?.items !== undefined) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const subMenu = item?.items !== undefined && item?.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root !== undefined ? true : active}
      key={item.label}
    >
      <ul>
        {item.items.map((child, i) => {
          return (
            <AppMenuItemMap
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <li
      className={classNames({
        'layout-root-menuitem' : props.root,
        'active-menuitem'      : active
      })}
    >
      {props.root !== undefined && item?.visible !== false && (
        <div className="layout-menuitem-root-text">{item?.label}</div>
      )}
      {(item?.to === undefined || item?.items !== undefined) && item?.visible !== false
        ? (
        <a
          href={item?.url}
          onClick={(e) => { itemClick(e); }}
          className={classNames(item?.class, 'p-ripple')}
          target={item?.target}
          tabIndex={0}
        >
          <i className={classNames('layout-menuitem-icon', item?.icon)}></i>
          <span className="layout-menuitem-text">{item?.label}</span>
          {item?.items !== undefined && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          )}
          <Ripple />
        </a>
          )
        : null}

      {item?.to !== undefined && item?.items === undefined && item?.visible !== false
        ? (
        <Link
          href={item?.to}
          replace={item?.replaceUrl}
          target={item?.target}
          onClick={(e) => { itemClick(e); }}
          className={classNames(item?.class, 'p-ripple', {
            'active-route': isActiveRoute
          })}
          tabIndex={0}
        >
          <i className={classNames('layout-menuitem-icon', item?.icon)}></i>
          <span className="layout-menuitem-text">{item?.label}</span>
          {item?.items !== undefined && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          )}
          <Ripple />
        </Link>
          )
        : null}

      {subMenu}
    </li>
  );
}
