/* eslint-disable @next/next/no-img-element */

import { Button } from 'primereact/button';
import { SpeedDial } from 'primereact/speeddial';
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppTopbarRef, LayoutState } from '../types/types';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const {
    layoutConfig,
    layoutState,
    onMenuToggle,
    showProfileSidebar,
    setLayoutState,
  } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const speedButtonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const router = useLocation();

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
    speedButton: speedButtonRef.current,
  }));

  const onConfigButtonClick = async () => {
    setLayoutState((prevState: LayoutState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  return (
    <div id="topbar" className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'
          }.png`}
          width="100px"
          // height={'35px'}
          alt="logo"
        />
        {/* <span>Kaave</span> */}
      </Link>
      <Button
        ref={speedButtonRef}
        icon="pi pi-bars"
        rounded
        className="layout-menu-button sm:hidden"
        type="button"
        size="large"
        style={{
          position: 'fixed',
          transform: 'translate(-50%, -10%)',
          left: '50%',
          bottom: 0,
          width: '5rem',
          height: '5rem',
        }}
        onClick={onMenuToggle}
      />
      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>
     
        <>
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
            className={classNames('layout-topbar-menu', {
              'layout-topbar-menu-mobile-active':
                layoutState.profileSidebarVisible,
            })}
          >
            {/* <div className='layout-topbar-title' onPointerDown={onPointerDown}></div> */}
            <div className="layout-topbar-button-menu">
              <Button
                type="button"
                onClick={onConfigButtonClick}
                title="Ayarlar"
                className="p-link layout-topbar-button"
              >
                <i className="pi pi-cog"></i>
                <span>Ayarlar</span>
              </Button>
            </div>
          </div>
        </>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
