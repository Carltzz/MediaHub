export interface YouTubeSearchResult {
  author: YouTubeAuthor;
  badges: string[];
  bestThumbnail: YouTubeThumbnail;
  description: string;
  duration: string;
  id: string;
  isLive: boolean;
  isUpcoming: boolean;
  thumbnails: YouTubeSearchResult[];
  title: string;
  type: string;
  upcoming: string;
  uploadedAt: string;
  url: string;
  views: number;
}

export interface YouTubeAuthor {
  avatars: YouTubeThumbnail[];
  bestAvatar: YouTubeThumbnail;
  channelID: string;
  name: string;
  ownerBadges: string[];
  url: string;
  verified: boolean;
}

export interface YouTubeThumbnail {
  url?: string;
  width: number;
  height: number;
}

const suffixes = [ "", "K", "M", "B" ];

export const formatViews = (views: number) => {
	let index = 0;
	for(index = 0; views >= 1000 && index < suffixes.length; views /= 1000.0, index++);
	return views.toFixed(1).replace(/\.0+$/,"") + suffixes[index];
};
