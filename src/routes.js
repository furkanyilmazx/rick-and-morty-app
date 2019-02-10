import React, { lazy } from 'react';
import { DefaultLayout } from './layouts';

const HomePage = lazy(() => import('./pages/HomePage'));

export const routes = [
  {
    path: '/',
    component: () => (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
  },
];
