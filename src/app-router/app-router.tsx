import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import Layout from "../components/UI/layout/Layout";

const Library = lazy(() => import("../components/UI/pages/Library/Library"));
const Artists = lazy(() => import("../components/UI/pages/Artists/Artists"));
const Favorites = lazy(
  () => import("../components/UI/pages/Favorites/Favorites")
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={routes.LIBRARY} element={<Library />} />
            <Route path={routes.ARTISTS} element={<Artists />} />
            <Route path={routes.FAVORITES} element={<Favorites />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
