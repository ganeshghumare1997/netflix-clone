import videoTestData from "../data/videos.json";

export const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = `youtube.googleapis.com/youtube/v3`;
  const response = await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`);

  return await response.json();
}

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const videoData = isDev ? videoTestData : await fetchVideos(url);

    if(videoData?.error){
        console.error("Youtube API error", videoData.error);
        return [];
    }

    return videoData?.items.map((item) => {
        const id = item.id?.videoId || item.id;

      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
        description : item.snippet.description,
        publishTime : item.snippet.publishedAt,
        channelTitle : item.snippet.channelTitle,
        statistics : item.statistics ? item.statistics.viewCount : {viewCount : 0}
      };
    });
  } catch (error) {
    console.log("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}`;

    return getCommonVideos(URL);
}

export const getPopularVideos = () => {
    const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

    return getCommonVideos(URL);
}

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
}