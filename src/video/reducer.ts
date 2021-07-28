import { InitialStateProps, VideoStatus } from './type';

export function reducer(state: InitialStateProps, action:any):InitialStateProps {
    switch (action.type) {
      case 'handlePlaying': {
        console.log('reducer handlePlaying', VideoStatus.PLAYING)
        return {...state, status: VideoStatus.PLAYING};
      }
      case 'handlePausing': {
        console.log('reducer handlePausing', VideoStatus.PAUSED)
        return {...state, status: VideoStatus.PAUSED};
      }
      case 'handleError': {
        console.log('reducer handleError', VideoStatus.WAITING)
        return {...state, status: VideoStatus.WAITING};
      }
      case 'modify': {
        // console.log('reducer modify', action)
        return { ...state, ...action.payload };
      }
      default:
        throw new Error();
    }
}