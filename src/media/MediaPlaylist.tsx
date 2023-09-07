import MediaItem from "./MediaItem";

export interface MediaPlaylist {
	id: number,
	name: string,
	author?: string,
	thumbnail?: string,
	tracks: MediaItem[]
}
