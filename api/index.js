export default $axios => ({
  videoList: (pageToken = null) => {
    return $axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
      params: {
        key: process.env.NUXT_ENV_YOUTUBE_KEY,
        part: 'snippet,contentDetails',
        maxResults: 12,
        chart: 'mostPopular',
        pageToken,
      }
    })
  },
  videoListById: (ids) => {
    return $axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
      params: {
        key: process.env.NUXT_ENV_YOUTUBE_KEY,
        part: 'snippet,contentDetails',
        id: ids.toString(),
      }
    })
  },
})
