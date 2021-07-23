import React, { FC } from 'react';
import '../index.scss';

import Progress from './progress';

import { ControllerProps, VideoStatus } from '../type';

const Controller: FC<ControllerProps> = ({ state, onPlay, onPuase }) => {
    const handlePlay = () => {
        onPlay();
    }

    const handlePuase = () => {
        onPuase();
    }

    const handleSeekingTime = (newTime: number) => {
        // 修改reducer里的seekingTime
    }

    const handleSeek = (newTime: number) => {
        // 修改videoRef 的 currentTime，reducer的currentTime
    }

    const handleForward = (val:number) => {
        // 快进 val 秒
    }

    const handleReplay = (val:number) => {
        // 倒退 val 秒
    }

    const renderBtn = () => {
        if (state.status === VideoStatus.PLAYING) return <button onClick={handlePlay} className='mlz-controller-playing' />
        else return <button onClick={handlePuase} className='mlz-controller-paused'/>
    }

    return <div id='mlz-controller' className="mlz-controller">
        {renderBtn()}
        <Progress
            onSeekingTime={handleSeekingTime} 
            onSeek={handleSeek}
            state={state} 
            onForward={handleForward}
            onReplay={handleReplay}
        />
    </div>
}

export default Controller;