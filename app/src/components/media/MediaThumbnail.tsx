import { useNavigate } from 'react-router-dom'
import './MediaThumbnail.scss'
import MediaItem from '../../media/MediaItem';

export const MediaThumbnail : React.FC<MediaItem> = (props) => {
  const navigate = useNavigate();

  const openPlayer = () => {
    const link = encodeURIComponent(props.link);
    navigate(`/player/${link}`);
  }

  return (
    <div className='media-thumbnail' onClick={openPlayer}>
      <div
        className='media-img'
        style={{
          backgroundImage: `url(${props.image})`,
        }}/>
      <div className='media-caption'>
        <p>{props.title}</p>
        <p>{props.author}</p>
      </div>
    </div>
  );
}
