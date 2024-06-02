import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react';
import './index.css'
import router from './router/Routes';
import AuthProvider from './providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
