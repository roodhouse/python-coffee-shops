import decode from "jwt-decode"

class AuthService {
    
    getProfile() {
        return decode(this.getToken())
    }

    loggedIn() {
        const token = this.getToken()
        // If there is a token and it is not expired return true
        return token && !this.isTokenExpired(token) ? true : false
    }

    isTokenExpired(token) {
        // decode the token to get its expiration time that was set by the server
        const decoded = decode(token)
        // If the expiration time is less than the current time (in seconds), the token is expired and we return true
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token')
            return true
        } 
        // If the token has not passed its expiration time then return false
        return false
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken)
        // call this in LoginForm, where the success login is then called?
    }

    logout() {
        localStorage.removeItem('id_token')
        // call this in Logout, where the other logout function is called?
    }
}

const authService = new AuthService()

export default authService;