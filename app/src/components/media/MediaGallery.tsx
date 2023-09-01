import { ReactNode, useState } from 'react'
import './MediaGallery.scss'
import { MediaThumbnail } from './MediaThumbnail'
import { Col, Row } from 'react-bootstrap'
import MediaItem from '../../media/MediaItem'

interface MediaGalleryState {
  items: MediaItem[],
}

interface MediaGalleryProps {
  height: number,
  items?: MediaItem[]
}

const MediaGallery: React.FC<MediaGalleryProps> = (props) => {
  const [mediaState, setMediaState] = useState<MediaGalleryState>({
    items: props.items || []
  });

  const removeItem = (node: MediaItem) => {
    setMediaState(prevState => ({
      ...prevState,
      elements: prevState.items.filter(
        item => item !== node
      )
    }));
  };

  const addItem = (node: MediaItem) => {
    setMediaState(prevState => ({
      ...prevState,
      elements: [...prevState.items, node]
    }));
  }

  return (
    <Row className="media-gallery g-4" style={{height: props.height}}>
        {
          (mediaState.items.length > 0) ?
            mediaState.items.map((element: MediaItem) => {
            return <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <MediaThumbnail
                    title={element.title}
                    author={element.author}
                    image={element.image}
                    link={element.link}/>
                    </Col>
                  })
            :
            <p>No playlists! Start making some</p>
        }
    </Row>
  );
}

export default MediaGallery
