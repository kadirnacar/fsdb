import { Outlet, Route, Routes, useRoutes } from 'react-router-dom';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import Crud from '../pages/crud/page';
import Empty from '../pages/empty';
import Home from '../pages/home';
import LandingPage from '../pages/landing/page';
import NotFoundPage from '../pages/notfound/page';
import ButtonDemo from '../pages/uikit/button/page';
import FileDemo from '../pages/uikit/file/page';
import FloatLabelDemo from '../pages/uikit/floatlabel/page';
import FormLayoutDemo from '../pages/uikit/formlayout/page';
import InputDemo from '../pages/uikit/input/page';
import InvalidStateDemo from '../pages/uikit/invalidstate/page';
import ListDemo from '../pages/uikit/list/page';
import MediaDemo from '../pages/uikit/media/page';
import MenuDemo from '../pages/uikit/menu/page';
import MessagesDemo from '../pages/uikit/message/page';
import MiscDemo from '../pages/uikit/misc/page';
import OverlayDemo from '../pages/uikit/overlay/page';
import PanelDemo from '../pages/uikit/panel/page';
import TableDemo from '../pages/uikit/table/page';
import TreeDemo from '../pages/uikit/tree/page';
import AccessDeniedPage from '../pages/auth/access/page';
import LoginPage from '../pages/auth/login/page';
import ErrorPage from '../pages/auth/error/page';

const AppLayout = (layoutConfig) => (
  <LayoutProvider initialLayout={{ ...layoutConfig }}>
    <Layout>
      <Outlet />
    </Layout>
  </LayoutProvider>
);

const WithoutLayout = (layoutConfig) => (
  <LayoutProvider initialLayout={{ ...layoutConfig }}>
    <Outlet />
  </LayoutProvider>
);

const routesConfig = (layoutConfig) => {
  return [
    {
      element: <WithoutLayout layoutConfig={layoutConfig} />,
      children: [
        {
          path: '/landing',
          element: <LandingPage />,
        },
        {
          path: '/notfound',
          element: <NotFoundPage />,
        },
        {
          path: '/access',
          element: <AccessDeniedPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/error',
          element: <ErrorPage />,
        },
      ],
    },
    {
      element: <AppLayout layoutConfig={layoutConfig} />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/empty',
          element: <Empty />,
        },
        {
          path: '/uikit/formlayout',
          element: <FormLayoutDemo />,
        },
        {
          path: '/uikit/input',
          element: <InputDemo />,
        },
        {
          path: '/uikit/floatlabel',
          element: <FloatLabelDemo />,
        },
        {
          path: '/uikit/invalidstate',
          element: <InvalidStateDemo />,
        },
        {
          path: '/uikit/button',
          element: <ButtonDemo />,
        },
        {
          path: '/uikit/table',
          element: <TableDemo />,
        },
        {
          path: '/uikit/list',
          element: <ListDemo />,
        },
        {
          path: '/uikit/tree',
          element: <TreeDemo />,
        },
        {
          path: '/uikit/panel',
          element: <PanelDemo />,
        },
        {
          path: '/uikit/overlay',
          element: <OverlayDemo />,
        },
        {
          path: '/uikit/media',
          element: <MediaDemo />,
        },
        {
          path: '/uikit/menu',
          element: <MenuDemo />,
        },
        {
          path: '/uikit/message',
          element: <MessagesDemo />,
        },
        {
          path: '/uikit/file',
          element: <FileDemo />,
        },
        {
          path: '/uikit/misc',
          element: <MiscDemo />,
        },
        {
          path: '/crud',
          element: <Crud />,
        },
      ],
    },
  ];
};

function App({ layoutConfig }) {
  const routes = useRoutes(routesConfig(layoutConfig));
  return routes;
  return (
    <LayoutProvider initialLayout={layoutConfig}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empty" element={<Empty />} />
          <Route path="/uikit/formlayout" element={<FormLayoutDemo />} />
          <Route path="/uikit/input" element={<InputDemo />} />
          <Route path="/uikit/floatlabel" element={<FloatLabelDemo />} />
          <Route path="/uikit/invalidstate" element={<InvalidStateDemo />} />
          <Route path="/uikit/button" element={<ButtonDemo />} />
          <Route path="/uikit/table" element={<TableDemo />} />
          <Route path="/uikit/list" element={<ListDemo />} />
          <Route path="/uikit/tree" element={<TreeDemo />} />
          <Route path="/uikit/panel" element={<PanelDemo />} />
          <Route path="/uikit/overlay" element={<OverlayDemo />} />
          <Route path="/uikit/media" element={<MediaDemo />} />
          <Route path="/uikit/menu" element={<MenuDemo />} />
          <Route path="/uikit/message" element={<MessagesDemo />} />
          <Route path="/uikit/file" element={<FileDemo />} />
          <Route path="/uikit/misc" element={<MiscDemo />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </LayoutProvider>
  );
}

export default App;
