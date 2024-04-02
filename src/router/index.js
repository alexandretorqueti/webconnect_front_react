// src/router/index.js


import ProtectedRoute from "../components/ProtectedRouter";

// Outras importações...
import Default from "../layouts/dashboard/default";
import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";

export const IndexRouters = [
  {
    path: "/",
    element: <ProtectedRoute />, // Utilize o ProtectedRoute aqui
    children: [
      {
        path: "/",
        element: <Default />,
        children: [...DefaultRouter, ...Layout1Router],
      },
    ],
  },
];
