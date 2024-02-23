import { Routes, Route } from "react-router-dom";
import { router } from "./routes/index";
import { Layout } from "./layouts/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";

function App() {
  return (
    // <SpaceProvider>
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
    </Routes>
    // </SpaceProvider>`
  );
}

export default App;
