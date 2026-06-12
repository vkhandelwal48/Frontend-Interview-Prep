import React, { useEffect, useState } from 'react';
import Light from './Light';
import './styles.css';

const config = {
  red: {
    backgroundColor: 'red',
    duration: 4000,
    next: 'green',
  },
  green: {
    backgroundColor: 'green',
    duration: 3000,
    next: 'yellow',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 500,
    next: 'red',
  }
}

const TrafficLight = ({ initialColor = 'green', layout }) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    const { next, duration } = config[color];
    const timer = setTimeout(() => {
      setColor(next);
    }, duration);

    return () => clearTimeout(timer);
  },[color]);

  return (
    <div className="wrapper">
    <div
      aria-label={`Traffic Light color is ${color}`}
      className={['traffic-light-container',
        layout === 'vertical' && 'traffic-light-container--vertical'].filter(Boolean).join(' ')}
    >
      {Object.keys(config).map((c) => (
        <Light
          key={c}
          backgroundColor={
            c === color ? config[c].backgroundColor : undefined
          }
        />
      ))}
    </div>
    </div>
  )
}

export default TrafficLight;
