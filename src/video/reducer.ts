import { InitialStateProps, VideoStatus, ActionProps } from './type';

export function reducer(state: InitialStateProps, action:ActionProps):InitialStateProps {
    switch (action.type) {
      case 'handlePlaying':
        return {...state, status: VideoStatus.PAUSED};
      case 'handlePausing':
        return {...state, status: VideoStatus.PLAYING};
      case 'handleError':
        return {...state, status: VideoStatus.WAITING};
      default:
        throw new Error();
    }
}