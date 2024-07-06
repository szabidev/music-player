import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import Layout from "../components/layout/Layout";

const Library = lazy(() => import("../components/pages/Library/Library"));
const Albums = lazy(() => import("../components/pages/Albums/Albums"));
const Artists = lazy(() => import("../components/pages/Artists/Artists"));
const Favorites = lazy(() => import("../components/pages/Favorites/Favorites"));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={routes.LIBRARY} element={<Library />} />
            <Route path={routes.ALBUMS} element={<Albums />} />
            <Route path={routes.ARTISTS} element={<Artists />} />
            <Route path={routes.FAVORITES} element={<Favorites />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
