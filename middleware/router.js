export default function ({ store, route }) {
  if (route.meta[0].keepAlive && !store.getters['app/cachedViews'].includes(route.name)) {
    store.commit('app/addCachedView', route.name)
  }
}
