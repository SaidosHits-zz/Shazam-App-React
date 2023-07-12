import * as React from "react";
import { createRoot } from "react-dom/client";
import './App.css'
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App/>
    ),
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);