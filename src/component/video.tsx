import React, { forwardRef } from 'react';
import classNames from 'classnames'
import { IVideoProps } from './type';
import './index.scss';

const Video = forwardRef<HTMLVideoElement, IVideoProps>((props, ref) => {
  const { className, preload='metadata', poster, src, children, ...rest } = props;

  const renderChildren = () => {
    if (children) return children
    else return <p>something error</p>
  }

  return (
      <video
        className={classNames('mlz-video', className)}
        id='mlz-video'
        ref={ref}
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