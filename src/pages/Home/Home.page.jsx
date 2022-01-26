import React, { useEffect } from 'react';

import './Home.style.css';
import { useGlobalContext } from '@providers/GlobalContext';
import useGetPictureOfTheDay from '@hooks/useGetPictureOfTheDay';
import ImageViewer from '@components/ImageViewer';
import Sidebar from '@components/Sidebar';

function HomePage(props) {
  let { date, setCurrent } = useGlobalContext();
  let { response } = useGetPictureOfTheDay(date);

  useEffect(() => {
    if (response.statusText === 'OK')
      setCurrent(response.data);
  }, [ date, response.statusText ]);

  return (
    <section 
      data-testid={props['data-testid']}
      className="home-page"
    >
      <ImageViewer className='home-page__image-viewer' />
      <Sidebar />
    </section>
  );
}

HomePage.defaultProps = {
  'data-testid': '',
};

export default HomePage;
