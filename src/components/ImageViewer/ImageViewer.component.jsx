import React from 'react';

import './ImageViewer.style.css';
import { useGlobalContext } from '@providers/GlobalContext';

function ImageViewer(props) {
  let { className } = props;
  let { current } = useGlobalContext();

  if (current.media_type === 'image') {
    return (
      <div
        data-testid={ props['data-testid'] }
        className={ 'image-viewer-component ' + className }
      >
        <img 
          className='image-viewer-component__image'
          alt='Image of the day'
          src={ current.hdurl }
        />
      </div>
    );  
  } else if (current.media_type === 'video') {
    return (
      <div
        data-testid={ props['data-testid'] }
        className={'.image-viewer-component ' + className}
      >
        <iframe 
          src={current.url} 
          className='image-viewer-component__video'
        />
      </div>
    );  
  } else {
    return (
      <div
        data-testid={ props['data-testid'] }
        className={ 'image-viewer-component ' + className }
      >
      </div>
    );  
  }
}

ImageViewer.defaultProps = {
  'data-testid': '',
  className: ''
};

export default ImageViewer;