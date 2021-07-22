import React, { FC } from 'react';
import '../index.scss';

import { ControllerProps, VideoStatus } from '../type';

const Controller: FC<ControllerProps> = ({ state, onPlay, onPuase }) => {

    const handlePlay = () => {
        onPlay();
    }

    const handlePuase = () => {
        onPuase();
    }

    const renderBtn = () => {
        if (state.status === VideoStatus.PLAYING) return <button onClick={handlePlay} className='mlz-controller-playing' />
        else return <button onClick={handlePuase} className='mlz-controller-paused'/>
    }

    return <div id='mlz-controller' className="mlz-controller">
        {renderBtn()}
        
    </div>
}

export default Controller;