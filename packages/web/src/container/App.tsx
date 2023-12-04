import { Route, Routes } from 'react-router-dom';
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

function App({ layoutConfig }) {
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
          <Route path="/uikit/landing" element={<LandingPage />} />
          <Route path="/uikit/crud" element={<Crud />} />
          <Route path="/uikit/notfound" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </LayoutProvider>
  );
}

export default App;
