import axios from 'axios'

const URL = 'http://localhost:8080/auth/'

class AuthService {
    login(user) {
        return axios
            .post(URL + 'login', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }

                return response.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(user) {
        return axios.post(URL + 'register', {
            username: user.username,
            password: user.password,
            name: user.name,
            surname: user.surname
        })
    }
}

export default new AuthService()