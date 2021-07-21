import React, { forwardRef } from 'react';
import { IPlayerProps } from './type';

import Video from './video';
import Controller from './controller';
import Loading from './loading';
import Bezel from './bezel';

import './index.scss';

const Player = forwardRef<HTMLVideoElement, IPlayerProps>((props, ref) => {
    const { ...rest } = props;
    
    return <div id='mlz-palyer' className='mlz-palyer'>
        <Video ref={ref} {...rest} />
        <Loading /> 
        <Bezel />
        <Controller />
    </div>

})

export default Player