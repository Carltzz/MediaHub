import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../redux/store";
import { MediaPlaylist } from "../media/MediaPlaylist";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuHidden } from "../redux/Menu";
import "./PlaylistPage.scss";

const PlaylistPage = () => {
	const { playlistId } = useParams();

	const playlists = useSelector((state: RootStore) =>
		state.playlists.playlists
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setMenuHidden(false));
	}, [])

	const findPlaylist = () => {
		if (!playlistId) {
			return undefined;
		}
		const id: number = parseInt(playlistId);
		return playlists.find(item => item.id == id);
	}

	const playlist: MediaPlaylist | undefined = findPlaylist();

	if (!playlist) {
		return (
			<>Playlist not found.</>
		)
	}

	return (
		<div className='app-screen'>
			<div className='playlist-header'>
				<div
					className='playlist-thumbnail'
					style={{
						backgroundImage: `url(${playlist.thumbnail})`
					}}>
				</div>
				<div className="playlist-details">
					<div className="playlist-info">
						<h2>{playlist.name}</h2>
						<h3>{playlist.author}</h3>
						<p>Tracks: {playlist.tracks.length}</p>
					</div>
					<div className="playlist-actions">
						<Button>Play</Button>
						<Button>Rename</Button>
						<Button>Delete</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaylistPage;
