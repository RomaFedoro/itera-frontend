import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../router/index";
import { TODAY_PATH } from "../utils/const";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          element={route.component}
          path={route.path}
          exact
        />
      ))}
      <Route path="*" element={<Navigate replace to={TODAY_PATH} />} />
    </Routes>
  );
};

export default AppRouter;
