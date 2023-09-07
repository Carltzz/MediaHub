// React
import React, { useEffect } from "react";

// Components
import MediaGallery from "../components/media/MediaGallery";
import { useDispatch } from "react-redux";
import { setMenuSelectedIndex, setMenuHidden } from "../redux/Menu";

const Home: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setMenuHidden(false));
		dispatch(setMenuSelectedIndex(0));
	});

	return (
		<div className="app-screen">
			<p>Your Library</p>
			<MediaGallery height={360} showAdd={true}/>
		</div>
	);
};

export default Home;
