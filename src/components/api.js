export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-16/',
  headers: {
    authorization: '24952460-73da-452d-95fc-2b05cf2309dc',
    'Content-Type': 'application/json'
  }
}

async function sendRequestToApi(url, data, method = 'GET') {
  const options = {
    method,
    headers: config.headers
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(`${config.baseUrl}${url}`, options);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};


export const getProfileInfo = async () => {
  return await sendRequestToApi('users/me');
};

export const editProfileInfo = async (name, about) => {
  return await sendRequestToApi('users/me', {
    name: name,
    about: about,
  }, 'PATCH');
};

export const editAvatar = async (avatar) => {
  return await sendRequestToApi('users/me/avatar', {
    avatar: avatar,
  }, 'PATCH');
};

export const getCardsInfo = () => {
  return sendRequestToApi('cards')
};

export const addNewCard = (name, link) => {
  return sendRequestToApi('cards', {
    name: name,
    link: link
  }, 'POST')
};

export const deleteCard = (cardId) => {
  return sendRequestToApi('cards/' + cardId, null, 'DELETE')
};

export const like = (cardId) => {
  return sendRequestToApi('cards/likes/' + cardId, null, 'PUT')
};

export const dislike = (cardId) => {
  return sendRequestToApi('cards/likes/' + cardId, null, 'DELETE')
};
