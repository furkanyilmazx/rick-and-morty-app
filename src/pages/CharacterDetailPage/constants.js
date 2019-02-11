import React from 'react';

export const COLUMNS = [
  {
    title: 'Episode',
    dataIndex: 'episode',
    key: 'episode',
    render: (item) => (
      <a
        target="blank"
        href={`http://www.google.com/search?q=rick+and+morty+${item}`}>
        {item}
      </a>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Air Date',
    dataIndex: 'air_date',
    key: 'air_date',
  },
];
