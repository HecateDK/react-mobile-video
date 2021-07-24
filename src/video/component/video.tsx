import React, { forwardRef, useImperativeHandle, useRef, ForwardedRef, useEffect, useCallback } from 'react';
import classNames from 'classnames'
import { IVideoProps, VideoRef, VideoStatus } from '../type';
import '../index.scss';

const Video = forwardRef<VideoRef | ForwardedRef<HTMLVideoElement>, IVideoProps>((props, ref) => {
  const { className, preload='metadata', poster, src, children, status, onPlay, onPuase, ...rest } = props;
  const videoRef = useRef<HTMLVideoElement>(null)

  const renderChildren = () => {
    if (children) return children
    else return <p>something error</p>
  }

  useImperativeHandle(ref, ()=>({
      apiDoPlaying: () => {
        if (videoRef.current) {
          return videoRef.current.play()
        }
      },
      apiDoPaused: () => {
        if (videoRef.current) {
          return videoRef.current.pause()
        }
      },
  }));

  const handlePlayerClick = useCallback(() => {
    console.log('handlePlayerClick', status);

    status === VideoStatus.PLAYING ? onPlay() : onPuase();
  }, [])

  useEffect(() =>{
    // 监听 Bezel
    window.addEventListener('click', handlePlayerClick, false);
    window.addEventListener('touch', handlePlayerClick, false);

    return () => {
      window.removeEventListener('click', handlePlayerClick);
      window.removeEventListener('touch', handlePlayerClick)
    }
  }, [])

  return (
      <video
        className={classNames('mlz-video', className)}
        id='mlz-video'
        ref={videoRef}
        preload={preload}
        poster={poster}
        src={src}
        {...rest}
      >
        {renderChildren()}
      </video>
    )
  })

export default Video