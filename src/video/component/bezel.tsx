import React, { useState, useRef, FC, useEffect } from 'react';

import '../index.scss';
import classNames from 'classnames';

import { BezelProps, VideoStatus } from '../type';

const Bezel: FC<BezelProps> = ({ status, onPuase, onPlay }) => {
    const [hidden, setHidden] = useState(true);

    const timer = useRef<any>(null);

    useEffect(() =>{
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [])

    const handlePlay = () => {
        clearTimeout(timer.current)

        setHidden(false)

        timer.current = setTimeout(() => {
            onPlay && onPlay();

            setHidden(true)
        }, 1000);
    }

    const handlePuase = () => {
        clearTimeout(timer.current)

        setHidden(false)

        timer.current = setTimeout(() => {
            onPuase && onPuase();

            setHidden(true)
        }, 1000);
    }

    const renderBtn = () => {
        if (status === VideoStatus.PLAYING) return <div onClick={handlePlay} className='mlz-bezel-icon mlz-bezel-icon-playing' />
        else return <div onClick={handlePuase} className='mlz-bezel-icon mlz-bezel-icon-playing' />
    }

    const style = hidden ? { display: 'none' }: {};

    return <div 
            className={classNames(
                {
                'mlz-bezel': true,
                'mlz-bezel-animation-alt': true,
                },
            )}
            role="status"
            aria-label={status}    
            style={style}
        >
            {renderBtn()}
        </div>
}

export default Bezel;