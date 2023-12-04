import { AppMenuItem } from '../types/types';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    {
      label: 'UI Components',
      items: [
        { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
        { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
        { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
        { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
        { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' },
      ],
    },

    {
      label: 'Auth',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Login',
          icon: 'pi pi-fw pi-sign-in',
          to: '/login',
        },
        {
          label: 'Error',
          icon: 'pi pi-fw pi-times-circle',
          to: '/error',
        },
        {
          label: 'Access Denied',
          icon: 'pi pi-fw pi-lock',
          to: '/access',
        },
      ],
    },
    {
      label: 'Pages',
      items: [
        {
          label: 'Landing',
          icon: 'pi pi-fw pi-globe',
          to: '/landing',
        },
        {
          label: 'Crud',
          icon: 'pi pi-fw pi-pencil',
          to: '/crud',
        },
        {
          label: 'Not Found',
          icon: 'pi pi-fw pi-exclamation-circle',
          to: '/notfound',
        },
        {
          label: 'Empty',
          icon: 'pi pi-fw pi-circle-off',
          to: '/empty',
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
