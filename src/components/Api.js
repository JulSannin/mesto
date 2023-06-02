export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;

    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`${res.status}: ${res.statusText}`)
    }

    getUser() {
        const request = this._baseUrl + `/users/me`;
        return fetch(request, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError)
    }

    getInitialCards() {
        const request = this._baseUrl + `/cards`;
        return fetch(request, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError)
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUser()]);
    }

    setAvatar(data) {
        const request = this._baseUrl + `/users/me/avatar`;
        return fetch(request, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.linkAvatar,
            })
        })
            .then(this._checkError)
    }

    setUser(data) {
        const request = this._baseUrl + `/users/me`;
        return fetch(request, {
            method: `PATCH`,
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then(this._checkError)
    }

    addNewCard(data) {
        const request = this._baseUrl + `/cards`;
        return fetch(request, {
            method: `POST`,
            headers: this._headers,
            body: JSON.stringify({
                name: data.nameImg,
                link: data.linkImg
            })
        })
            .then(this._checkError)
    }

    deleteCard(cardId) {
        const request = this._baseUrl + `/cards/${cardId}`;
        return fetch(request, {
            method: `DELETE`,
            headers: this._headers
        })
            .then(this._checkError)
    }

    addLike(cardId) {
        const request = this._baseUrl + `/cards/likes/${cardId}`;
        return fetch(request, {
            method: `PUT`,
            headers: this._headers
        })
            .then(this._checkError)
    }

    removeLike(cardId) {
        const request = this._baseUrl + `/cards/likes/${cardId}`;
        return fetch(request, {
            method: `DELETE`,
            headers: this._headers
        })
            .then(this._checkError)
    }
}