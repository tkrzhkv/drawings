import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PaintingInfo = React.lazy(() => import("./pages/PaintingInfo/PaintingInfo"));

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainLayout />}
      >
        <Route
          path=''
          element={<Home />}
        />
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='paintingInfo/:id'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PaintingInfo />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
