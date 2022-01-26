import React from 'react';

import './ImageInfo.style.css'
import { useGlobalContext } from '@providers/GlobalContext';

function ImageInfo(props) {
  let { className } = props;
  let { current } = useGlobalContext();

  return (
    <div className={`image-info ${ className}`}>
      <h2>{current.title}</h2>
      <p>{current.explanation}</p>
    </div>
  );
};

ImageInfo.defaultProps = {
  className: '',
};

export default ImageInfo;