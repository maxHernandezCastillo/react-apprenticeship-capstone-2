import React from 'react';

import './Sidebar.style.css';
import { useGlobalContext } from '@providers/GlobalContext';
import DateChooser from '@components/DateChooser';
import ImageInfo from '@components/ImageInfo';

function Sidebar(props) {
  let { className } = props;
  const { isDateChooserOpen } = useGlobalContext();

  return (
    <div
      data-testid={props['data-testid']}
      className={`sidebar-component ${className} ${(isDateChooserOpen ? '' : 'sidebar-component--closed')}`}
    >
      <ImageInfo />
      <DateChooser />
    </div>
  );
}

Sidebar.defaultProps = {
  'data-testid': '',
  className: ''
};

export default Sidebar;
