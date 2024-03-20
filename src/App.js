import { Routes, Route } from 'react-router-dom';
import { router } from './routes/index';
import { Layout } from './layouts/index';
import { Fragment } from 'react';
import { NotFound } from './pages/index';

function App() {
  return (
    // <QueryClientProvider client={QueryClient}>
    <Routes>
      {router.map((route, index) => {
        const Page = route.component;
        let LayoutDynamic = Layout;
        if (route.layout) LayoutDynamic = route.layout;
        else if (route.layout === null) LayoutDynamic = Fragment;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <LayoutDynamic>
                <Page />
              </LayoutDynamic>
            }
          />
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
    // </QueryClientProvider>
  );
}

export default App;
