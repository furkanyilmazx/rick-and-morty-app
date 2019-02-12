import React from 'react';
import ReactDOM from 'react-dom';
import RowCol from './RowCol';
import renderer from 'react-test-renderer';
it('RowCol tests passed successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RowCol />, div);
});

it('Snapshot Created', () => {
  let props = { label: 'Name', value: 'Furkan' };
  const component = renderer.create(<RowCol {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
