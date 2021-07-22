import { Ref } from "react";

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

export interface VideoRef extends Ref {
    apiDoPlaying: (value: any) => void
}

export interface IPlayerProps extends IVideoProps {
    
}

export interface ControllerProps {
    state: InitialStateProps;
    onPlay:() => void;
    onPuase:() => void;
}