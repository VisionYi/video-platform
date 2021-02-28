export const getFormatData = (youTubeItem) => {
  const timeMatch = youTubeItem.contentDetails.duration.match(/PT(\d{0,2})H?(\d{0,2})M?(\d{1,2})S/)
  let time = ''
  if (timeMatch) {
    const hh = timeMatch[1] ? timeMatch[1].padEnd(2, '0') : ''
    const mm = timeMatch[2] ? timeMatch[2].padEnd(2, '0') : ''
    const ss = timeMatch[3] ? timeMatch[3].padEnd(2, '0') : ''
    time = `${hh}${hh ? ':' : ''}${mm}${mm ? ':' : ''}${ss}`
  }

  return {
    id: youTubeItem.id,
    title: youTubeItem.snippet.title,
    content: youTubeItem.snippet.description,
    image: youTubeItem.snippet.thumbnails?.standard?.url || youTubeItem.snippet.thumbnails?.default?.url || '',
    time,
  }
}

export const getFavoriteVideos = () => JSON.parse(localStorage.getItem('favoriteVideo')) || []
export const addFavoriteVideos = (item) => {
  const items = getFavoriteVideos()
  items.unshift(item)
  localStorage.setItem('favoriteVideo', JSON.stringify(items))
}
export const removeFavoriteVideos = (id) => {
  const items = getFavoriteVideos()
  const index = items.findIndex(item => item.id === id)
  items.splice(index, 1)
  localStorage.setItem('favoriteVideo', JSON.stringify(items))
}
