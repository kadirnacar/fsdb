import { Route, Routes } from 'react-router-dom';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import Empty from '../pages/empty';
import Home from '../pages/home';
import Category from '../pages/category';
import Product from '../pages/product';
import Menu from '../pages/menu';

function App({ layoutConfig }) {
  return (
    <LayoutProvider initialLayout={layoutConfig}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/:category?" element={<Category />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/menu/:itemId" element={<Menu />} />
          <Route path="/empty" element={<Empty />} />
        </Routes>
      </Layout>
    </LayoutProvider>
  );
}

export default App;
