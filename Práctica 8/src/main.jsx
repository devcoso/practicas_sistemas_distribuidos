import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

// Pages
import Auth from "./Pages/Auth";
import Tasks from "./Pages/Tasks";

// Loaders
import { loader as authLoader } from "./Pages/Auth";
import { loader as tasksLoader } from "./Pages/Tasks";

const router = createBrowserRouter([
  {
    index: true,
    element: <Tasks />,
    loader: tasksLoader,
  },
  {
    path: "/auth",
    element: <Auth />,
    loader: authLoader,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}
