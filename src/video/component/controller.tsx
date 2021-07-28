import React, { FC } from 'react';
import '../index.scss';

import Progress from './progress';
import Timer from './timer';

import { ControllerProps, VideoStatus } from '../type';

const Controller: FC<ControllerProps> = ({ state, onPlay, onPuase, onSeekingTime, onSeek, onForward }) => {
    const handlePlay = () => {
        onPlay && onPlay();
    }

    const handlePuase = () => {
        onPuase && onPuase();
    }

    const handleSeekingTime = (newTime: number) => {
        // 修改reducer里的seekingTime
        onSeekingTime && onSeekingTime(newTime);
    }

    const handleSeek = (newTime: number) => {
        // 修改videoRef 的 currentTime，reducer的currentTime
        onSeek && onSeek(newTime);
    }

    const handleForward = (val:number) => {
        // 快进 val 秒
        onForward && onForward(val);
    }

    const renderBtn = () => {
        if (state.status === VideoStatus.PLAYING) return <button onClick={handlePuase} className='mlz-controller-paused' />
        else return <button onClick={handlePlay} className='mlz-controller-playing'/>
    }

    return <div id='mlz-controller' className="mlz-controller">
        {renderBtn()}
        <Progress
            onSeekingTime={handleSeekingTime} 
            onSeek={handleSeek}
            state={state} 
            onForward={handleForward}
        />
        <Timer state={state} />
    </div>
}

export default Controller;