export const state = () => ({
  accessToken: '',
  refreshToken: ''
})

const accessTokenKey = 'access_token'
const refreshTokenKey = 'refresh_token'

export const mutations = {
  setTokens (state, {
    accessToken,
    refreshToken
  }) {
    this.$axios.defaults.headers.common['Authorization'] = accessToken

    state.accessToken = accessToken
    state.refreshToken = refreshToken
  },
}

export const actions = {
  init (ctx) {
    return Promise.all([this.$localForage.getItem(accessTokenKey), this.$localForage.getItem(refreshTokenKey)]).then(([accessToken, refreshToken]) => {
      ctx.commit('setTokens', {
        accessToken,
        refreshToken
      })
    })
  },
  saveTokens (ctx, {
    accessToken,
    refreshToken
  }) {
    return Promise.all([this.$localForage.setItem(accessTokenKey, accessToken), this.$localForage.setItem(refreshTokenKey, refreshToken)]).then(([accessToken, refreshToken]) => {
      ctx.commit('setTokens', {
        accessToken,
        refreshToken
      })
    })
  },
  deleteTokens (ctx) {
    return Promise.all([this.$localForage.removeItem(accessTokenKey), this.$localForage.removeItem(refreshTokenKey)]).then(() => {
      ctx.commit('setTokens', {accessToken: null, refreshToken: null })
    })
  }
}
