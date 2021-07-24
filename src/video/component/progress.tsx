import React, { FC, useRef, useState } from 'react';
import Slider from './slider';
import { ProgressProps } from '../type';

import { getPointerPosition, findElPosition } from '../utils/dom';
import { formatTime } from '../utils';

interface ProgressStateProps {
  time: number | null;
  position: number;
}

interface LoadProgressBarProps {
  buffered:any;
  duration:number;
}

interface MouseTimeDisplayProps {
  mouseTime: ProgressStateProps;
  duration:number;
}

interface PlayProgressBarProps {
  time: number;
  duration:number;
}

const LoadProgressBar:FC<LoadProgressBarProps> = ({buffered, duration}) => {
  if (!buffered || !buffered.length) {
    return null;
  }
  let bufferedEnd = buffered.end(buffered.length - 1);
  const style = {width:'0'};

  if (bufferedEnd > duration) {
    bufferedEnd = duration;
  }

  function percentify(time:number, end:number) {
    const percent = time / end || 0; 
    return `${(percent >= 1 ? 1 : percent) * 100}%`;
  }

  style.width = percentify(bufferedEnd, duration);

  let parts: JSX.Element[] | null = [];

  for (let i = 0; i < buffered.length; i++) {
    const start = buffered.start(i);
    const end = buffered.end(i);

    const part = (
      <div
        style={{
          left: percentify(start, bufferedEnd),
          width: percentify(end - start, bufferedEnd)
        }}
        key={`part-${i}`}
      />
    );
    parts.push(part);
  }

  if (parts.length === 0) {
    parts = null;
  }

  return (
    <div
      style={style}
      className='mlz-controller-load-progress'
    >
      <span className='mlz-controller-control-text'>Loaded: 0%</span>
      {parts}
    </div>
  );
}

const MouseTimeDisplay:FC<MouseTimeDisplayProps> = ({ mouseTime, duration }) => {
  if (!mouseTime.time) {
    return null;
  }

  const time = formatTime(mouseTime.time, duration);

  return (
    <div
      className='mlz-controller-mouse-display'
      style={{
        left: `${mouseTime.position}px`
      }}
      data-current-time={time}
    />
  );
}

const PlayProgressBar:FC<PlayProgressBarProps> = ({time, duration}) => {
  return (
    <div
      data-current-time={formatTime(time, duration)}
      className='mlz-controller-play-progress-bar'
    >
      {/* <span className="video-react-control-text">
        {`Progress`}
      </span> */}
    </div>
  );
}

const Progress:FC<ProgressProps> = ({ state, onSeekingTime, onSeek, onForward, onReplay }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { duration, buffered, seekingTime, currentTime } = state;

  const [ mouseTime, setMouseTime ] = useState<ProgressStateProps>({
    time: null,
    position: 0
  })

    const handleMouseMoveThrottle = (event: any) => {
      if (!event.pageX) {
        return;
      }
      
      const node = sliderRef.current;
      const newTime = getPointerPosition(node!, event).x * duration;
      const position = event.pageX - findElPosition(node!).left;
  
      setMouseTime({
        time: newTime,
        position
      })
    }

    const getPercent = () => {
        const { currentTime, seekingTime, duration } = state;
        const time = seekingTime || currentTime;
        const percent = time / duration;
        return percent >= 1 ? 1 : percent;
    }

    const getNewTime = (event:any) => {
      if (sliderRef.current) {
        const { duration } = state;
        const distance = getPointerPosition(sliderRef.current, event).x;
        const newTime = distance * duration;

        return newTime === duration ? newTime - 0.1 : newTime; 
      }
      return 0;
    }

    const handleMouseMove = (event: any) => {
      const newTime = getNewTime(event)
      onSeekingTime && onSeekingTime(newTime)
    }

    const handleMouseUp = (event:any) => {
      const newTime = getNewTime(event)

      onSeek && onSeek(newTime)
    }

    const handleStepForward = () => {
      onForward && onForward(5)
    }

    const handleStepBack = () => {
      onReplay && onReplay(5)
    }

    return (
        <div
          onMouseMove={handleMouseMoveThrottle}
          className='mlz-controller-progress'
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
            <LoadProgressBar buffered={buffered} duration={duration} />
            <MouseTimeDisplay mouseTime={mouseTime} duration={duration} />
            <PlayProgressBar time={seekingTime ||currentTime} duration={duration} />
          </Slider>
        </div>
      );
}

export default Progress;