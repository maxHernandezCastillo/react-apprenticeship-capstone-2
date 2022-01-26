import React from 'react';

import './Layout.style.css';
import Header from '@components/Header';

function Layout(props) {
let { children } = props;

  return (
    <div
      data-testid={ props['data-testid'] }
      className='layout-component'
    >
      <Header />
      <div className='layout-component__content'>
        { children }
      </div>
    </div>
  );
};

Layout.defaultProps = {
  'data-testid': '',
};

export default Layout;