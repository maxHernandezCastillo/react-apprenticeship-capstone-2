import React from 'react';

import './Sidebar.style.css';
import DateChooser from '@components/DateChooser';
import ImageInfo from '@components/ImageInfo';

function Sidebar(props) {
  let { className } = props;

  return (
    <div
      data-testid={props['data-testid']}
      className={`sidebar-component ${className}`}
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
