export const getFormatData = (youTubeItem) => {
  const timeMatch = youTubeItem.contentDetails.duration.match(/PT(\d{0,2})H?(\d{0,2})M?(\d{1,2})S/)
  let time = ''
  if (timeMatch) {
    time = `${timeMatch[1]}${timeMatch[1] ? ':' : ''}${timeMatch[2]}${timeMatch[2] ? ':' : ''}${timeMatch[3]}`
  }

  return {
    id: youTubeItem.id,
    title: youTubeItem.snippet.title,
    content: youTubeItem.snippet.description,
    image: youTubeItem.snippet.thumbnails?.standard?.url || youTubeItem.snippet.thumbnails?.default?.url || '',
    time,
  }
}

export const getFavoriteIds = () => JSON.parse(localStorage.getItem('favoriteId')) || []
export const addFavoriteIds = (id) => {
  const ids = getFavoriteIds()
  ids.unshift(id)
  localStorage.setItem('favoriteId', JSON.stringify(ids))
}
export const removeFavoriteIds = (id) => {
  const ids = getFavoriteIds()
  ids.splice(ids.indexOf(id), 1)
  localStorage.setItem('favoriteId', JSON.stringify(ids))
}
