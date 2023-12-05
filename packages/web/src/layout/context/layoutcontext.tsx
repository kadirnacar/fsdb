import { createContext, useContext, useState } from 'react';
import { ChildContainerProps, LayoutConfig, LayoutContextProps, LayoutState } from '../../types/types';
import { PrimeReactContext } from 'primereact/api';
export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children, initialLayout }: ChildContainerProps) => {
  const { changeTheme } = useContext(PrimeReactContext);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(
    initialLayout
      ? ((initialLayout as any).layoutConfig as any)
      : {
          ripple: false,
          inputStyle: 'outlined',
          menuMode: 'static',
          colorScheme: 'light',
          theme: 'lara-light-indigo',
          scale: 14,
        }
  );

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  });

  const onMenuToggle = () => {
    if (isOverlay()) {
      setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
    }

    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
    } else {
      setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
    }
  };

  const showProfileSidebar = () => {
    setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
  };

  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay';
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const setLayoutConfigd = (state: (prevState) => any) => {
    const data = state(layoutConfig);
    setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, ...data }));
  };

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig: setLayoutConfigd as any,
    layoutState,
    setLayoutState,
    onMenuToggle,
    showProfileSidebar,
    changeTheme,
  };
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
