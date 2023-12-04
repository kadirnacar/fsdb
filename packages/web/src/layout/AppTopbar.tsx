import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppTopbarRef, LayoutState } from '../types/types';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, setLayoutState } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));
  const onConfigButtonClick = async () => {
    setLayoutState((prevState: LayoutState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'
          }.png`}
          height={'35px'}
          alt="logo"
        />
        <span>Application</span>
      </Link>

      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
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
        className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}
      >
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>
        {/* <Link to="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link> */}
      </div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
