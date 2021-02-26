export default $axios => ({
  videoList: (pageToken = null) => {
    return $axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
      params: {
        key: 'AIzaSyA06-aXEiH_nzTyugEVL8zERazSwuJRcfc',
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
        key: 'AIzaSyA06-aXEiH_nzTyugEVL8zERazSwuJRcfc',
        part: 'snippet,contentDetails',
        id: ids.toString(),
      }
    })
  },
})
