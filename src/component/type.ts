export interface IVideoProps {
    poster:string; // 视频封面
    src?:string; // 视频连接 有source则不需要
    className?:string;
    preload?:string;
    // children?:HTMLSourceElement;
    children?:any;
}

export interface IPlayerProps extends IVideoProps {
    
}