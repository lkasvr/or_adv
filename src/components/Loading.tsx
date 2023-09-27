import React from 'react';
import ReactLoading from 'react-loading';

interface Props {
  type:
    | 'blank'
    | 'balls'
    | 'bars'
    | 'bubbles'
    | 'cubes'
    | 'cylon'
    | 'spin'
    | 'spinningBubbles'
    | 'spokes';
  color?: string;
  delay?: number;
  height: number | string;
  width: number | string;
  className?: string;
}

const Loading = ({ type, color, width, height, delay, className }: Props) => {
  return (
    <ReactLoading
      className={className}
      type={type}
      color={color ?? '#2c455b'}
      width={width}
      height={height}
      delay={delay}
    />
  );
};

export default Loading;
