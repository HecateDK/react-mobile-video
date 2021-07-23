import React, { useState, useEffect, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import { SliderProps } from '../type';

const Slider = forwardRef((
    { 
        valuenow, 
        valuetext, 
        getPercent, 
        children, 
        onMouseMove, 
        onMouseDown, 
        onSliderActive, 
        onStepForward, 
        onStepBack, 
        onFocus, 
        onBlur, 
        onMouseUp, 
        onSliderInactive, 
        onClick,
      } : SliderProps,
      ref: Ref<HTMLDivElement>
    ) => {
    const [ active, setActive ] = useState(false);

    useEffect(() =>{
        return () => {
            window.removeEventListener('mousemove', handleMouseMove, true);
            window.removeEventListener('mouseup', handleMouseUp, true);
            window.removeEventListener('touchmove', handleMouseMove, true);
            window.removeEventListener('touchend', handleMouseUp, true);
            window.removeEventListener('keydown', handleKeyPress, true);
        }
    }, [])

    const handleMouseMove = (event:any) => {
        if (onMouseMove) {
          onMouseMove(event);
        }
    }

    const handleMouseUp= (event:any) => {
        event.preventDefault();

        window.removeEventListener('mousemove', handleMouseMove, true);
        window.removeEventListener('mouseup', handleMouseUp, true);
        window.removeEventListener('touchmove', handleMouseMove, true);
        window.removeEventListener('touchend', handleMouseUp, true);

        setActive(false);

        onSliderInactive && onSliderInactive(event)

        onMouseUp && onMouseUp(event)
    }

    const handleMouseDown= (event:any) => {
        // event.preventDefault();
        // event.stopPropagation();

        window.addEventListener('mousemove', handleMouseMove, true);
        window.addEventListener('mouseup', handleMouseUp, true);
        window.addEventListener('touchmove', handleMouseMove, true);
        window.addEventListener('touchend', handleMouseUp, true);

        setActive(true);

        if (onSliderActive) {
            onSliderActive(event);
        }

        handleMouseMove(event);

        if (onMouseDown) {
            onMouseDown(event);
        }
    }

    // 快捷键
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.which === 37 || event.which === 40) {
            event.preventDefault();
            event.stopPropagation();
            stepBack();
          } else if (event.which === 38 || event.which === 39) {
            event.preventDefault();
            event.stopPropagation();
            stepForward();
          }
    }

    const handleFocus= (event:any)=> {
        window.addEventListener('keydown', handleKeyPress, true);
        onFocus && onFocus(event)
    }

    const handleBlur = (event:any) => {
        document.removeEventListener('keydown', handleKeyPress, true);
        onBlur && onBlur(event);
    }

    const handleClick= (event:any) => {
        event.preventDefault();
        // event.stopPropagation();
        onClick && onClick(event)
    }

    // 快进
    const stepForward = () => {
        onStepForward && onStepForward()
    }

    // 快退
    const stepBack = () => {
        onStepBack && onStepBack()
    }

    const renderChildren = () => {
        let progress = getPercent() || 0;
        if (typeof progress !== 'number' || progress < 0 || progress === Infinity) {
            progress = 0;
        }

        const percentage = `${(progress * 100).toFixed(2)}%`;
        return React.Children.map(children, child =>
            React.cloneElement(child, { progress, percentage })
        );
    }

    return <div
            className={classNames(
                {
                    'mlz-controller-slider-sliding': active
                },
                    'mlz-controller-slider'
                )}
            id='mlz-controller-slider'
            ref={ref}
            role="slider"
            aria-label={'mlz-controller-slider'}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            aria-valuenow={valuenow || 0}
            aria-valuetext={valuetext || ''}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            {renderChildren()}
        </div>
})

export default Slider