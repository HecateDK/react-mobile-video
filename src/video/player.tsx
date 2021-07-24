import React, { forwardRef, useCallback, useEffect, useReducer, useRef } from 'react';
import { IPlayerProps, VideoRef, VideoStatus } from './type';
import { initialState } from './content';
import { reducer } from './reducer';

import Video from './component/video';
import Controller from './component/controller';
import Loading from './component/loading';
import Bezel from './component/bezel';

import './index.scss';

const Player = forwardRef<VideoRef, IPlayerProps>((props, ref) =>{
    const { ...rest } = props;
    const videoRef = useRef(null) as any;

    const [state, dispatch] = useReducer(reducer, initialState);
    const { status, currentTime, seekingTime, isActive, isFullscreen } = state;

    const handlePlay = () => {
        console.log('handlePlay', videoRef.current)
        if (videoRef.current) {
            const promise = videoRef.current.apiDoPlaying();
            if (promise !== undefined) {
                promise.catch(() => {
                    dispatch({ type: 'handleError' })
                }).then(() => {
                    dispatch({ type: 'handlePlaying' })
                });
            }
        }
    }

    const handlePause = () => {
        console.log('handlePause', videoRef.current)
        if (videoRef.current) {
            videoRef.current.apiDoPaused();
            dispatch({ type: 'handlePausing' })
        }
    }
    
    return <div id='mlz-palyer' className='mlz-palyer'>
        <Video 
            ref={videoRef} 
            status={status}
            onPlay={handlePlay}
            onPuase={handlePause}
            {...rest} 
        />
        {/* <Loading /> */}
        <Bezel 
            onPlay={handlePlay} 
            onPuase={handlePause} 
            status={status} 
        /> 
        <Controller 
            state={state} 
            onPlay={handlePlay} 
            onPuase={handlePause} 
        />
    </div>

})

export default Player