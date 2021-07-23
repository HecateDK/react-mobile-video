import { Ref } from 'react';

// 播放器状态
export enum VideoStatus {
    WAITING = 'waiting',
    PLAYING = 'playing',
    ERROR = 'error',
    PAUSED = 'paused',
}

export interface InitialStateProps {
    status: VideoStatus;
    currentTime: number;
    seekingTime: number;
    isActive:boolean;
    isFullscreen:boolean;
    duration:number;
    buffered: any;
}

export interface ActionProps {
    type: string;
    preload?: any;
}

export interface IVideoProps {
    poster:string; // 视频封面
    src?:string; // 视频连接 有source则不需要
    className?:string;
    preload?:string;
    // children?:HTMLSourceElement;
    children?:any;
}

export interface VideoRef {
    apiDoPlaying: (value: any) => void
}
export interface IPlayerProps extends IVideoProps {
    
}

export interface ControllerProps {
    state: InitialStateProps;
    onPlay:() => void;
    onPuase:() => void;
}

export interface ProgressProps {
    state: InitialStateProps;
    onSeekingTime: (newTime: number) => void;
    onSeek:(newTime: number) => void;
    onForward:(val: number) => void;
    onReplay:(val: number) => void;
}
export interface SliderProps {
    valuenow:number;
    valuetext:string;
    getPercent:() => number;
    children: any;
    onMouseMove: (event:any) => void;
    onMouseDown?: (event:any) => void;
    onMouseUp: (event:any) => void;
    onSliderInactive?: (event:any) => void; 
    onSliderActive?: (event:any) => void;
    onStepForward:() => void;
    onStepBack:() => void;
    onFocus?: (event:any) => void;
    onBlur?: (event:any) => void;
    onClick?: (event:any) => void;
}