// React
import React, { useNavigate } from "react-router-dom";

// Components
import "./MediaThumbnail.scss";
import { MediaPlaylist } from "../../media/MediaPlaylist";

export const MediaThumbnail = (props: MediaPlaylist) => {
	const navigate = useNavigate();

	const openPlaylist = () => {
		const link = encodeURIComponent(props.id);
		navigate(`/playlist/${props.id}`);
	};

	return (
		<div className='media-thumbnail' onClick={openPlaylist}>
			<div
				className='media-img'
				style={{
					backgroundImage: `url(${props.thumbnail})`,
				}}/>
			<div className='media-caption'>
				<p>{props.name}</p>
				<p>{props.author}</p>
			</div>
		</div>
	);
};
