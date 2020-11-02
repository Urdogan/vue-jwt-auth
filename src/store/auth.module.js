import AuthService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))

// initial state
const state = () => ({
    status: user ? true : false,
    user: user ? user : null
})

// actions
const actions = {
    login({ commit }, user) {
        return AuthService.login(user).then(
            user => {
                commit('LOGIN_SUCCESS', user)
                return Promise.resolve(user)
            },
            error => {
                commit('LOGIN_FAILURE')
                return Promise.reject(error)
            }
        )
    },
    logout({ commit }) {
        AuthService.logout()
        commit('LOGOUT')
    },
    register({ commit }, user) {
        return AuthService.register(user).then(
            response => {
                commit('RESGISTER')
                return Promise.resolve(response.data)
            },
            error => {
                commit('RESGISTER')
                return Promise.reject(error)
            }
        )
    }
}

// mutations
const mutations = {
    ['LOGIN_SUCCESS']: (state, user) => {
        state.status = true
        state.user = user
    },
    ['LOGIN_FAILURE']: (state) => {
        state.status = false
        state.user = null
    },
    ['LOGOUT']: (state) => {
        state.status = false
        state.user = null
    },
    ['RESGISTER']: (state) => {
        state.status = false
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}