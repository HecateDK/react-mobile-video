import React, { FC, useRef } from 'react';
import Slider from './slider';
import { ProgressProps } from '../type';

const Progress:FC<ProgressProps> = ({ state, onSeekingTime, onSeek }) => {
  const sliderRef = useRef<any>(null);

    const handleMouseMoveThrottle = () => {

    }

    const getPercent = () => {
        const { currentTime, seekingTime, duration } = state;
        const time = seekingTime || currentTime;
        const percent = time / duration;
        return percent >= 1 ? 1 : percent;
    }

    const getNewTime = () => {
      if (sliderRef.current) {
        const { duration } = state;
        const distance = sliderRef.current.apiGetClient();
        const newTime = distance * duration;

        return newTime === duration ? newTime - 0.1 : newTime; 
      }
      return 0;
    }

    const handleMouseMove = () => {
      const newTime = getNewTime()
      onSeekingTime && onSeekingTime(newTime)
    }

    const handleMouseUp = () => {
      const newTime = getNewTime()

      onSeek && onSeek(newTime)
    }

    const handleStepForward = () => {

    }

    const handleStepBack = () => {

    }

    return (
        <div
          onMouseMove={handleMouseMoveThrottle}
          className='mlz-controller-progress-control'
        >
          <Slider 
            ref={sliderRef}
            getPercent={getPercent} 
            valuenow={0} 
            valuetext=''
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onStepForward={handleStepForward}
            onStepBack={handleStepBack}
          >

          </Slider>
        </div>
      );
}

export default Progress;