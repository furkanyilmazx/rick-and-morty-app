import React, { lazy } from 'react';
import { DefaultLayout } from './layouts';

const HomePage = lazy(() => import('./pages/HomePage'));
const CharacterDetailPage = lazy(() => import('./pages/CharacterDetailPage'));

export const routes = [
  {
    path: '/',
    component: () => (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
  },
  {
    path: '/character/:id',
    component: () => (
      <DefaultLayout>
        <CharacterDetailPage />
      </DefaultLayout>
    ),
  },
];
