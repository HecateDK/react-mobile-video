import React, { forwardRef, useCallback, useEffect, useReducer, useRef } from 'react';
import { IPlayerProps, VideoRef, VideoStatus } from './type';
import classNames from 'classnames'
import { initialState } from './content';
import { reducer } from './reducer';

import Controller from './component/controller';
import Loading from './component/loading';
import Bezel from './component/bezel';

import './index.scss';

const Player = forwardRef<VideoRef, IPlayerProps>((props, ref) =>{
    const { preload='metadata', poster, src, children, className, onDurationchange, ...rest } = props;
    const videoRef = useRef(null) as any;

    const [state, dispatch] = useReducer(reducer, initialState);
    const { status, currentTime, seekingTime, isActive, isFullscreen } = state;

    // 及时更新state里面的currentTime
    useEffect(() => {
        const timeupdateListener = () => {
          const { currentTime, buffered } = videoRef.current;

          dispatch({ type: 'modify', payload: { currentTime, buffered } });
        };

        if(videoRef.current) {
          videoRef.current.addEventListener('timeupdate', timeupdateListener);
        }

        return ()=>{
          if(videoRef.current){
            videoRef.current.removeEventListener('timeupdate', timeupdateListener);
          }
        }
      }, []);

    const handlePlayerClick = useCallback(() => {
        console.log('handlePlayerClick', status);
    
        status === VideoStatus.PLAYING ? handlePlay() : handlePause();
    }, [])

    useEffect(() =>{
        // 监听 Bezel
        document.addEventListener('click', handlePlayerClick);
        document.addEventListener('touch', handlePlayerClick);
    
        return () => {
            document.removeEventListener('click', handlePlayerClick);
            document.removeEventListener('touch', handlePlayerClick)
        }
      }, [])

    const handlePlay = () => {
        console.log('handlePlay', status)
        if (videoRef.current) {
            const promise = videoRef.current.play();
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
        console.log('handlePause', status)
        if (videoRef.current) {
            videoRef.current.pause();
            dispatch({ type: 'handlePausing' })
        }
    }

    const renderChildren = () => {
        if (children) return children
        else return <p>something error</p>
    }

    const handleLoaded = () => {
        if(videoRef.current) {
            const duration = videoRef.current.duration;
            dispatch({ type: 'modify', payload: { duration: duration } });
        }
    }

    return <div id='mlz-palyer' className='mlz-palyer'>
        <video
            className={classNames('mlz-video', className)}
            id='mlz-video'
            ref={videoRef}
            preload={preload}
            poster={poster}
            src={src}
            onDurationChange={(e) => {
                handleLoaded();
                onDurationchange && onDurationchange(e);
              }}
            {...rest}
        >
            {renderChildren()}
        </video>
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