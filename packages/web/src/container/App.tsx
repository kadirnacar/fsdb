import { Route, Routes } from 'react-router-dom';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import Empty from '../pages/empty';
import Home from '../pages/home';

function App({ layoutConfig }) {
  return (
    <LayoutProvider initialLayout={layoutConfig}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empty" element={<Empty />} />
        </Routes>
      </Layout>
    </LayoutProvider>
  );
}

export default App;
