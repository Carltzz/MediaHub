import { useParams } from 'react-router-dom';
import './VideoPlayer.scss'
import { useEffect } from 'react';

const resizeYouTubeFrame = (event: any) => {
  const player = event.target;
  const container = document.getElementsByClassName('vid-player-screen')[0] as HTMLElement;
  window.addEventListener('resize', () => {
    resizePlayer(player, container);
  })
  if (!container)
    return;
  resizePlayer(player, container);
}

function resizePlayer(player: any, container: HTMLElement) {
  const aspect = 16 / 9;
  const height = container.offsetHeight - 64;
  console.log(height);
  const width = height * aspect;
  player.setSize(width, height);
}

const VideoPlayer = () => {
  let { id, platform } = useParams();
  const decodedLink = decodeURIComponent(id ?? "");

  const createYoutubePlayer = () => {
    new (window as any).YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: id,
      events: {
        onReady: resizeYouTubeFrame
      }
    });
  }

  let embed = <></>;

  if (platform === 'youtube') {
    embed = (
      <div id='youtube-player'>hi</div>
    );
  } else {
    embed = <video controls src={decodedLink} />
  }

  useEffect(() => {
    createYoutubePlayer();
  })

  return (
    <div className="vid-player-screen">
      {embed}
    </div>
  );
}

export default VideoPlayer;
