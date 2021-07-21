import React, { useRef } from 'react';
import Player from './component/player';
import Video from './component/video';
import './App.scss';

function App() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  const videoUrl = "https://online-education.codemao.cn/444/162142647511721.mp4"
  const imgUrl = 'https://online-education.codemao.cn/444/162142647511721.mp4?vframe/jpg/offset/1/w/750/h/562'
  return (
    <div className="App">
      <Player src={videoUrl} poster={imgUrl} ref={videoRef1} />
      <br/>
      {/* <Video src={videoUrl} poster={imgUrl} ref={videoRef2} />
      <br/>
      <br/>
      <Video poster={imgUrl} ref={videoRef3} >
        <source src={videoUrl} type="video/mp4" />
      </Video> */}
    </div>
  );
}

export default App;
