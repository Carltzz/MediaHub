// React
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import "./VideoPlayer.scss";

const resizeYouTubeFrame = (event: any) => {
	const player = event.target;
	const allContainers = document.getElementsByClassName("vid-player-screen");
	const container = allContainers[0] as HTMLElement;
	if (allContainers.length > 1) {
		console.warn("Found multiple containers for the YouTube embed.");
	}
	if (!container) {
		console.error("Could not find container for YouTube embed.");
	}
	window.addEventListener("resize", () => {
		resizePlayer(player, container);
	});
	resizePlayer(player, container);
};

function resizePlayer(player: any, container: HTMLElement) {
	const aspect = 16 / 9;
	const height = container.offsetHeight - 64;
	console.log(height);
	const width = height * aspect;
	player.setSize(width, height);
}

const VideoPlayer = () => {
	const { id, platform } = useParams();
	const decodedLink = decodeURIComponent(id ?? "");

	const createYoutubePlayer = () => {
		new (window as any).YT.Player("youtube-player", {
			height: "0",
			width: "0",
			videoId: id,
			events: {
				onReady: resizeYouTubeFrame
			}
		});
	};

	let embed = <></>;

	if (platform === "youtube") {
		embed = (
			<div id='youtube-player'>hi</div>
		);
	} else {
		embed = <video controls src={decodedLink} />;
	}

	useEffect(() => {
		createYoutubePlayer();
	});

	return (
		<div className="vid-player-screen">
			{embed}
		</div>
	);
};

export default VideoPlayer;
