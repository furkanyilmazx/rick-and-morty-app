import React from 'react';
import ReactDOM from 'react-dom';
import CharacterCard from './CharacterCard';
import { MemoryRouter } from 'react-router';

it('CharacterCard tests passed successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/']}>
      <CharacterCard />
    </MemoryRouter>,
    div
  );
});
