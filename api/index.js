export default $axios => ({
  videoList: ({ maxResults = 12, pageToken = null }) => {
    return $axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
      params: {
        key: process.env.NUXT_ENV_YOUTUBE_KEY,
        part: 'snippet,contentDetails',
        regionCode: 'TW',
        chart: 'mostPopular',
        maxResults,
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
  videoSearch: ({ query, maxResults = 12, pageToken = null }) => {
    return $axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: process.env.NUXT_ENV_YOUTUBE_KEY,
        part: 'snippet',
        type: 'video',
        q: query,
        maxResults,
        pageToken,
      }
    })
  }
})
