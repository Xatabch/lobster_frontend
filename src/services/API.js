import Cookies from 'js-cookie';

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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/signup/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/signin/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/follow/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/follow/`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/logout/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/posts/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: form
        });

        console.log(await response.json());

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
        let csrftoken = Cookies.get('csrftoken');
        const response = await fetch(`${this.host}/api/posts/`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
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