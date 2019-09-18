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

        const data = await response.json();

        console.log(data);

        return data;
    }
}

export default new API({host: HOST || 'http://localhost:8000'});