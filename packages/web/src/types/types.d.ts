import React, { ReactNode } from 'react';
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;        // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}
import {
  Page,
  AppBreadcrumbProps,
  Breadcrumb,
  BreadcrumbItem,
  MenuProps,
  MenuModel,
  AppSubMenuProps,
  LayoutConfig,
  LayoutState,
  AppBreadcrumbState,
  Breadcrumb,
  LayoutContextProps,
  MailContextProps,
  MenuContextProps,
  ChatContextProps,
  TaskContextProps,
  AppConfigProps,
  NodeRef,
  AppTopbarRef,
  MenuModelItem,
  AppMenuItemProps,
  AppMenuItem,
} from './layout';

type ChildContainerProps = {
  children: ReactNode;
  initialLayout?: LayoutConfig;
};

export type {
  Page,
  AppBreadcrumbProps,
  Breadcrumb,
  BreadcrumbItem,
  MenuProps,
  MenuModel,
  LayoutConfig,
  LayoutState,
  Breadcrumb,
  LayoutContextProps,
  MenuContextProps,
  AppConfigProps,
  NodeRef,
  AppTopbarRef,
  AppMenuItemProps,
  ChildContainerProps,
  CustomEvent,
  AppMenuItem,
};
