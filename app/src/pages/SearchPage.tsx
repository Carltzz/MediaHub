// React
import React, {
	ReactNode,
	useEffect,
	useState
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

// Components
import "./SearchPage.scss";
import SearchBar from "../components/SearchBar";
import { useAppContext } from "../ApplicationContext";
import { formatViews } from "../YouTube";

interface SearchResultProps {
  thumbnail: string;
  title: string;
  author: string;
  views?: number;
  id: string;
}

const getSearchResults = async (platform: string, query: string) => {
	const ipc = (window as any).api;
	if (platform === "youtube") {
		const results = await ipc.invokeMessage("youtube-search", {
			query: query
		});
		return results;
	} else {
		console.error("Unsupported platform:", platform);
		return [];
	}
};

const SearchPage = () => {
	const { platform } = useParams();
	const { setAppState } = useAppContext();
	const [searchResults, setSearchResults] = useState<any[]>();

	useEffect(() => {
		let selectedIndex = 1;
		switch(platform) {
		case "youtube": selectedIndex = 2; break;
		case "soundcloud": selectedIndex = 3; break;
		}

		setAppState(prevState => ({
			...prevState,
			menuBarHidden: false,
			menuSelectedIndex: selectedIndex
		}));
	}, [setAppState, platform]);

	if (!platform) {
		return <SearchHome />;
	}

	const updateSearchResults = async (query: string) => {
		if (platform === "youtube") {
			getSearchResults(platform, query).then(results => {
				setSearchResults(results.items);
			});
		}
	};

	const formatSearchResult = (result: any): ReactNode => {
		if (result.type !== "video") {
			return <></>;
		}

		return (
			<Col>
				<SearchResult
					title={result.title}
					author={result.author.name}
					thumbnail={result.bestThumbnail.url}
					views={result.views}
					id={result.id}/>
			</Col>
		);
	};

	return (
		<div className="search-screen">
			<SearchBar onSubmit={(query) => updateSearchResults(query)}/>
			<hr />
			<p>Search results: </p>
			<div className="search-results">
				{searchResults?.map(result => formatSearchResult(result))}
			</div>
		</div>
	);
};

const SearchHome = () => {
	const navigate = useNavigate();

	const goToPlatform = (platform: string) => {
		navigate(`/search/${platform}`);
	};

	return (
		<Row xs={12} className="search-home g-0">
			<Col onClick={() => goToPlatform("youtube")}
				style={youtubeBg}
				className='first-search search-category'>
			</Col>
			<Col onClick={() => goToPlatform("soundcloud")}
				style={soundcloudBg}
				className='last-search search-category'>
			</Col>
		</Row>
	);
};

const SearchResult: React.FC<SearchResultProps> = (props) => {
	const navigate = useNavigate();
	const bgStyle = {
		backgroundImage: `url(${props.thumbnail})`
	};

	const navigateToVideo = () => {
		const id = encodeURIComponent(props.id);
		navigate(`/player/youtube/${id}`);
	};

	return (
		<div className='search-result'>
			<div className='result-thumbnail' style={bgStyle} onClick={() => navigateToVideo()}></div>
			<div className='result-info'>
				<div className='result-title'>{props.title}</div>
				<div className='result-author'>{props.author}</div>
				<div className='result-views'>{formatViews(props.views as number)}</div>
			</div>
		</div>
	);
};

const youtubeBg = {
	backgroundImage: "url(/img/preview/youtube.jpg)",
	backgroundSize: "cover",
	backgroundPosition: "center"
};

const soundcloudBg = {
	backgroundImage: "url(/img/preview/soundcloud.png)",
	backgroundSize: "cover",
	backgroundPosition: "center"
};

export default SearchPage;
