class API {
    constructor({
        host = 'http://localhost:8000'
    } = {}) {
        this.host = host;
    }

    async signup({
        login = '',
        email = '',
        password = ''
    } = {}) {
        const response = await fetch(`${this.host}/api/signup/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': login,
                'email': email,
                'password': password
            })
        });

        const errors = await response.json();

        return {
            status: response.status,
            errors: errors
        };
    }

    async signin({
        login = '',
        password = ''
    } = {}) {
        const response = await fetch(`${this.host}/api/signin/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': login,
                'password': password
            })
        });

        const data = await response.json();

        return {
            status: response.status,
            ...data
        };
    }

    async checAuth() {
        const response = await fetch(`${this.host}/api/signin/`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });

        return {
            status: response.status,
        }
    }

    async profile({
        username = ''
    } = {}) {
        let response;

        if (!username) {
            response = await fetch(`${this.host}/api/profile/`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            });
        } else {
            response = await fetch(`${this.host}/api/profile/${username}/`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            });
        }

        const data = await response.json();

        return {
            status: response.status,
            ...data
        };
    }

    async follow({
        username = ''
    } = {}) {
        const response = await fetch(`${this.host}/api/follow/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
            })
        });

        return {
            status: response.status
        }
    }

    async unfollow({
        username = ''
    } = {}) {
        const response = await fetch(`${this.host}/api/follow/`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
            })
        });

        return {
            status: response.status
        }
    }

    async logout() {
        const response = await fetch(`${this.host}/api/logout/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        return {
            status: response.status
        }
    }

    async addPost({
        form = {}
    } = {}) {
        const response = await fetch(`${this.host}/api/posts/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: form
        });

        return {
            status: response.status
        }
    }

    async getPosts({
        page = 1, 
        offset = 10,
        username = ''
    } = {}) {
        let response;
        if (!username) {
            response = await fetch(`${this.host}/api/posts/${page}/${offset}/`, {
                mode: 'cors',
                credentials: 'include'
            });
        } else {
            response = await fetch(`${this.host}/api/posts/${page}/${offset}/${username}/`, {
                mode: 'cors',
                credentials: 'include'
            });
        }

        let data = await response.json()

        return {
            status: response.status,
            posts: Array.from(data)
        }
    }

    async deletePost({
        id = 0
    } = {}) {
        const response = await fetch(`${this.host}/api/posts/`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
            })
        });

        return {
            status: response.status
        }
    }
}

export default new API({host: HOST || 'http://localhost:8000'});