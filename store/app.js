export const state = () => ({
  searchText: '',
  cachedViews: []
})

export const getters = {
  searchText: state => state.searchText,
  cachedViews: state => state.cachedViews,
}

export const mutations = {
  setSearchText (state, payload) {
    state.searchText = payload
  },
  addCachedView (state, payload) {
    state.cachedViews.push(payload)
  },
}
