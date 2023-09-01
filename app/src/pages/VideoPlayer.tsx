import { useParams } from 'react-router-dom';
import './VideoPlayer.scss'

const VideoPlayer = () => {
  let { link } = useParams();
  const decodedLink = decodeURIComponent(link ?? "");

  return (
    <div className="vid-player-screen">
      <video controls src={decodedLink}/>
    </div>
  );
}

export default VideoPlayer;
