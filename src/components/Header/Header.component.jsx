  import React from 'react';

import './Header.style.css';
import { useGlobalContext } from '@providers/GlobalContext';
import NasaLogo from '@assets/NASA_logo.svg';
import WizelineLogo from '@assets/2D_logo_red.svg';
import DateButton from './DateButton.component';

function Header(props) {
  let { loading } = useGlobalContext();

  return (
    <div
      data-testid={ props['data-testid'] }
      className='header-component'
    >
      <div className='header-component__content'>
        <div
          className='header-component__nasa-info'
          onClick={() => window.open("https://www.nasa.gov/multimedia/imagegallery/iotd.html")}
        >
          <img
            src={ NasaLogo }
            alt='Nasa logo'
            className='header-component__nasa-logo'
          />
          <h4>Astronomy Picture of the Day</h4>
        </div>

        <div className='header-component__right-container'>
          <DateButton />
          <img
            src={ WizelineLogo }
            alt='Wizeline logo'
            className='header-component__wizeline-logo'
            onClick={() => window.open("https://www.wizeline.com")}
          />
        </div>
      </div>

      <div className={
        `header-component__loading ${ (loading ? 'header-component__loading--show' : '') }`
      } />
    </div>
  );
};

Header.defaultProps = {
  'data-testid': '',
};

export default Header;