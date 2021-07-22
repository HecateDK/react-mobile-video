import React, { forwardRef, useImperativeHandle, useRef, ForwardedRef } from 'react';
import classNames from 'classnames'
import { IVideoProps, VideoRef } from '../type';
import '../index.scss';

const Video = forwardRef<VideoRef | ForwardedRef<HTMLVideoElement>, IVideoProps>((props, ref) => {
  const { className, preload='metadata', poster, src, children, ...rest } = props;
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