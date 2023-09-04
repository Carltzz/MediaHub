import { ReactNode, useState } from 'react'
import './MediaGallery.scss'
import { MediaThumbnail } from './MediaThumbnail'
import { Col, Row } from 'react-bootstrap'
import MediaItem from '../../media/MediaItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

interface MediaGalleryState {
  items: MediaItem[],
}

interface MediaGalleryProps {
  height: number,
  items?: MediaItem[]
}

const MediaGallery: React.FC<MediaGalleryProps> = (props) => {
  const [mediaState ] = useState<MediaGalleryState>({
    items: props.items || []
  });

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
            <Col xs={12} sm={6} md={4} lg={3} xl={2}
            className='empty-gallery'
            style={{...emptyGalleryStyle, flexDirection: 'column'}}>
              <FontAwesomeIcon icon={faAdd} size='2x' style={iconStyle}/>
            </Col>
        }
    </Row>
  );
}

const emptyGalleryStyle = {
  display: 'flex',
  height: 'calc(100% - 32px)',
  backgroundColor: '#090909',
  marginLeft: '16px',
  borderRadius: '20px',
  padding: '64px'
};

const iconStyle = {
  flexGrow: 1
}

export default MediaGallery
