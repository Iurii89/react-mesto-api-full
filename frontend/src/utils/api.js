class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
    this.cardId = config._id;
  }

  handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this.handleOriginalResponse);
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this.handleOriginalResponse);
  }

  sendEditProfile(formValues) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about,
      }),
    }).then(this.handleOriginalResponse);
  }

  sendNewCard(newCardValue) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: newCardValue.name,
        link: newCardValue.link,
      }),
    }).then(this.handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleOriginalResponse);
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this.handleOriginalResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    isLiked
      ? this.deleteLike(cardId).catch((err) => {
          console.log(err);
        })
      : this.addLike(cardId).catch((err) => {
          console.log(err);
        });

    return this.getCards().catch((err) => {
      console.log(err);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleOriginalResponse);
  }

  changeAvatar(urlNewAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: urlNewAvatar,
      }),
    }).then(this.handleOriginalResponse);
  }

  register(email, password) {
    return fetch(`${this.url}/signup`, {
        method: 'POST',
        headers: this.headers,
        credentials: "include",
        body: JSON.stringify({
          email, 
          password,
        })
    })
  }

  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      })
    })
  }
}




const config = {
  url: "http://localhost:3001",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "authorization": `Bearer ${localStorage.getItem('token')}`,
    // "Access-Control-Allow-Origin": "https://api.iurii.nomoredomains.club",
    // "Access-Control-Allow-Headers": "Content-Type, Accept-Encoding, Connection, Content-Length, Host, Origin, Referer, User-Agent, sec-ch-ua, sec-ch-ua-mobile, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site",
  },
};

const api = new Api(config);

export default api;
