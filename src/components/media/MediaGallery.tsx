// React
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRegistered } from "@fortawesome/free-solid-svg-icons";

// Components
import { MediaThumbnail } from "./MediaThumbnail";
import MediaItem from "../../media/MediaItem";
import "./MediaGallery.scss";
import { useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addPlaylist } from "../../redux/Playlist";
import { MediaPlaylist } from "../../media/MediaPlaylist";

interface MediaGalleryProps {
	height: number,
	showAdd?: boolean,
}

const MediaGallery = (props: MediaGalleryProps) => {

	const playlists = useSelector((state: RootStore) =>
		state.playlists.playlists);

	const dispatch = useDispatch();

	const findFreeId = () => {
		for (let id = 0;;id++) {
			if (!playlists.find(playlist => playlist.id == id)) {
				return id;
			}
		}
	}

	const findFreeName = () => {
		let name: string;
		for (let index = 1;;index++) {
			name = `Playlist #${index}`;
			if (!playlists.find(playlist => playlist.name == name)) {
				return name;
			}
		}
	}

	const createPlaylist = () => {
		const playlist: MediaPlaylist = {
			id: findFreeId(),
			name: findFreeName(),
			author: "Guest",
			thumbnail: '/img/playlist_default.jpg',
			tracks: [],
		}
		dispatch(addPlaylist(playlist));
	}

	const addThumbnail = () => {
		return (
			<Col xs={12} sm={6} md={4} lg={3} xl={2}
				onClick={createPlaylist}
				className='gallery-add'>
				<FontAwesomeIcon
					className="gallery-add-icon"
					icon={faAdd}
					size='2x' />
			</Col>);
	};

	return (
		<Row className="media-gallery g-4" style={{ height: props.height }}>
			{props.showAdd === true && addThumbnail()}
			{playlists.length > 0 &&
				playlists.map((element: MediaPlaylist) => {
					return (
						<Col xs={12} sm={6} md={4} lg={3} xl={2} key={element.id}>
							<MediaThumbnail
								name={element.name}
								author={element.author}
								thumbnail={element.thumbnail}
								id={element.id}
								tracks={element.tracks} />
						</Col>
					);
				})
			}
		</Row>
	);
};

export default MediaGallery;
