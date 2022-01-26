import React, { useEffect, useState, useRef, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DateChooseCards.style.css';
import { useGlobalContext } from '@providers/GlobalContext';

function DateChooseCards(props) {
  let { className, items, loading } = props;
  const { setDate } = useGlobalContext();
  let [ size, setSize ] = useState({ width: null, heigth: null });
  const cardsContainerRef = useRef(null);

  // Calculate Component size in pixels
  useEffect(() => {
    setSize({
      width: cardsContainerRef.current.offsetWidth, 
      heigth: cardsContainerRef.current.offsetHeight
    });
    window.addEventListener(
      'resize', 
      () => setSize((prevState) => {
        let { offsetWidth, offsetHeight } = cardsContainerRef.current;
        if (offsetWidth !== prevState.width)
          return { width: offsetWidth, hegith: offsetHeight }
        return prevState;
      })
    );
  }, []);

  // Generates a list of spans to sort the images in the component
  const grid_span_list = useMemo((unit = 150, gap = 12, iterations = 5) => {
    let cells = 0;
    for (let i = 1; (unit * i) + (gap * (i + 1)) < size.width; i++)
      cells += 1;

    let spans = new Array();
    let emptySlots = new Uint8Array(iterations).fill(cells);
    for (let i = 0; i < iterations; i++) {
      while(emptySlots[i] > 0) {
        let columnSpan = Math.floor(Math.random() * Math.min(emptySlots[i] - 1)) + 1;
        let gridSpan = Math.floor(Math.random() * Math.min((iterations - i), emptySlots[i] - 1)) + 1;
        for (let j = 0; j < gridSpan; j++)
          emptySlots[i + j] -= columnSpan;

        spans.push({ gridColumn: `span ${ columnSpan }`, gridRow: `span ${ gridSpan }` })
      }
    }

    return spans;
  }, [size.width])

  if (loading) {
    return (
      <div 
        className={`date-chooser-cards-component ${className}`}
        ref={ cardsContainerRef }
      >
        {  // Generate numbers from 0 to 30
          (Array.from(Array(31).keys()).map((item) => (  
            <div
              key={ item }
              className='date-chooser-cards-component__card--loading'
              style={ grid_span_list[item % grid_span_list.length] }
            />
          )))
        }
      </div>
    );
  }

  return (
    <div
      className={`date-chooser-cards-component ${className}`}
      ref={ cardsContainerRef }
    >
      {
        items.map((item, index) => {
          let image = item.media_type === 'image' ? item.url : item.thumbnail_url;
          
          if (image) {
            return (
              <div
                key={ item.date }
                className='date-chooser-cards-component__card'
                style={ grid_span_list[index % grid_span_list.length] }
                onClick={() => setDate(item.date)}
              >
                <img 
                  src={ image } 
                  className='date-chooser-cards-component__card-image'
                  draggable="false"
                />
                <div className='date-chooser-cards-component__card-title'>
                  <h1>{item.date.split('-')[2]}</h1>
                  {
                    item.media_type === 'video' ?
                      <FontAwesomeIcon icon={['fas', 'video']} /> 
                      : null
                  }
                </div>
              </div>
            );
          }

          return (
            <div
              key={ item.date }
              className='date-chooser-cards-component__card--empty'
              style={ grid_span_list[index % grid_span_list.length] }
              onClick={() => setDate(item.date)}
            >
                <div className='date-chooser-cards-component__card-title--empty'>
                  <h1>{item.date.split('-')[2]}</h1>
                  {
                    item.media_type === 'video' ?
                      <FontAwesomeIcon icon={['fas', 'video']} /> 
                      : null
                  }
                </div>
            </div>
          );
        })
      }
    </div>
  );
};

DateChooseCards.defaultProps = {
  className: '',
  items: [],
  loading: false
};

export default DateChooseCards;