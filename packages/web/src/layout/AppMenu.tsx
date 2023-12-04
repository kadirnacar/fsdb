/* eslint-disable @next/next/no-img-element */

import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DataService } from '../services/DataService';
import { AppMenuItem } from '../types/types';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const [categorys, setCategorys] = useState<any[]>([] as any[]);
  const [menuItems, setMenuItems] = useState<AppMenuItem[]>([] as any[]);
  const router = useLocation();
  const params = useParams();

  const getCategoryTree = (cat: any, data: any[]) => {
    // const itms = data
    //   .filter((x) => x.parentId == cat.id)
    //   .map((x) => getCategoryTree(x, data));
    return {
      to: '/menu/' + cat.id,
      label: cat.label,
      // items: itms.length > 0 ? itms : null,
    };
  };
  useEffect(() => {
    DataService.getList<any>('Category').then((data) => {
      const mnItems: any[] = data.value
        ? data.value
            .filter((x) => x.parentId == '')
            .sort((a, b) => {
              if (a.index < b.index) return -1;
              else if (a.index > b.index) return 1;
              return 0;
            })
            .map((x, i) => {
              return getCategoryTree(x, data.value);
            })
        : [];
      console.log('router', router, params);
      setMenuItems(
        [
          {
            label: 'Menu',
            items: mnItems,
          } as any,
        ].concat({
          label: 'Ayarlar',
          items: [
          ],
        })
      );
    });
  }, []);

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {menuItems.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} showRoot={false} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
