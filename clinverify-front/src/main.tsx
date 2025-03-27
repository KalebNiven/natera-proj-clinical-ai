import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { RootLayout } from '@/layouts/root';
import { NotFoundPage } from '@/pages/404.tsx';
import { ChatsPage } from '@/pages/chats';
import { HomePage } from '@/pages/home';
import { PatientDetailsPage } from '@/pages/patient-details';
import { PatientsPage } from '@/pages/patients';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/patients',
        element: <PatientsPage />,
      },
      {
        path: '/chats',
        element: <ChatsPage />,
      },
      {
        path: '/patients/:caseBundlingId',
        element: <PatientDetailsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
