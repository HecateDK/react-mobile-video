import React, { forwardRef, useReducer, useRef } from 'react';
import { IPlayerProps, VideoRef } from './type';
import { initialState } from './content';
import { reducer } from './reducer';

import Video from './component/video';
import Controller from './component/controller';
import Loading from './component/loading';
import Bezel from './component/bezel';

import './index.scss';

const Player = forwardRef<VideoRef, IPlayerProps>((props, ref) =>{
    const { ...rest } = props;
    const videoRef = useRef(null);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { status, currentTime, seekingTime, isActive, isFullscreen } = state;

    const handlePlay = () => {
        console.log('handlePlay', ref, videoRef)
        if (videoRef.current) {
            const promise = videoRef.current.apiDoPlaying();
            if (promise !== undefined) {
                promise.catch(() => {

                }).then(() => {
                    dispatch({ type: 'handlePlaying' })
                });
            }
        }
    }

    const handlePause = () => {
        dispatch({ type: 'handlePausing'})
    }
    
    return <div id='mlz-palyer' className='mlz-palyer'>
        <Video ref={videoRef} {...rest} />
        {/* <Loading /> 
        <Bezel /> */}
        <Controller 
            state={state} 
            onPlay={handlePlay} 
            onPuase={handlePause} 
        />
    </div>

})

export default Player