import { InitialStateProps, VideoStatus, ActionProps } from './type';

export function reducer(state: InitialStateProps, action:ActionProps):InitialStateProps {
    switch (action.type) {
      case 'handlePlaying':
        return {...state, status: VideoStatus.PLAYING};
      case 'handlePausing':
        return {...state, status: VideoStatus.PAUSED};
      default:
        throw new Error();
    }
}