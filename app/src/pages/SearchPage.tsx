import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Col, Row } from "react-bootstrap";
import { useAppContext } from "../ApplicationContext";
import { useEffect } from "react";
import './SearchPage.scss';


const getSearchSuggestions = (platform: string, query: string): string[] => {
  const ipc = (window as any).api;
  return ipc.invokeMessage('get-suggestions', {
    platform: platform,
    query: query
  });
}

const SearchPage = () => {
  const { platform } = useParams();
  const { setAppState } = useAppContext();

  useEffect(() => {
    let selectedIndex = 1;
    switch(platform) {
      case 'youtube': selectedIndex = 2; break;
      case 'soundcloud': selectedIndex = 3; break;
    }
    setAppState(prevState => ({
      ...prevState,
      menuBarHidden: false,
      menuSelectedIndex: selectedIndex
    }));
  }, [setAppState, platform])

  if (!platform) {
    return <SearchHome />
  }

  return (
    <div className="search-screen">
      <SearchBar onSubmit={(query) => getSearchSuggestions(platform, query)}/>
      <hr />
      <p>Search results: </p>
    </div>
  )
}

const SearchHome = () => {
  const navigate = useNavigate();

  const goToPlatform = (platform: string) => {
    navigate(`/search/${platform}`);
  };

  return (
    <Row xs={12} className="search-home g-0">
      <Col onClick={() => goToPlatform('youtube')}
           style={youtubeBg}
           className='first-search search-category'>
      </Col>
      <Col onClick={() => goToPlatform('soundcloud')}
           style={soundcloudBg}
           className='last-search search-category'>
      </Col>
    </Row>
  )
}

const youtubeBg = {
  backgroundImage: "url(/img/preview/youtube.jpg)",
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

const soundcloudBg = {
  backgroundImage: "url(/img/preview/soundcloud.png)",
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

export default SearchPage;
