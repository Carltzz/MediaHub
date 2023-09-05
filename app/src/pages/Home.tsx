// React
import React, { useEffect } from "react";
import "./Home.scss";

// Components
import SearchBar from "../components/SearchBar";
import MediaGallery from "../components/media/MediaGallery";
import { useAppContext } from "../ApplicationContext";

const Home: React.FC = () => {
	const { setAppState } = useAppContext();

	useEffect(() => {
		setAppState(prevState => ({
			...prevState,
			menuBarHidden: false,
			menuSelectedIndex: 0
		}));
	}, [setAppState]);

	const doSearch = (query: string) => {
		const ipc = (window as any).api;
		ipc.invokeMessage("media-download", {
			platform: "youtube",
			url: query
		});
	};

	return (
		<div className="home-screen">
			<SearchBar onSubmit={doSearch}/>
			<hr />
			<p>Your Library</p>
			<MediaGallery height={360} />
		</div>
	);
};

export default Home;
