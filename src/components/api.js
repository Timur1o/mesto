export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-16/',
  headers: {
    authorization: '24952460-73da-452d-95fc-2b05cf2309dc',
    'Content-Type': 'application/json'
  },
  currentUser: {}
}


async function api(url, data, method = 'GET') {
  let options = {
    method,
    headers: config.headers
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(`${config.baseUrl}${url}`, options);
  try {
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
    throw err
  }
}

export const getProfileInfo = async () => {
  config.currentUser = await api('users/me');
  return config.currentUser;
};

export const editProfileInfo = async (name, about) => {
  config.currentUser = await api('users/me', {
    name: name,
    about: about,
  }, 'PATCH');
  return config.currentUser;
};

export const editAvatar = async (avatar) => {
  config.currentUser = await api('users/me/avatar', {
    avatar: avatar,
  }, 'PATCH');
  return config.currentUser;
};


export const getCardsInfo = () => {
  return api('cards')
};

export const addNewCard = (name, link) => {
  return api('cards', {
    name: name,
    link: link
  }, 'POST')
};

export const removeCard = (cardId) => {
  return api('/cards' + cardId, {
    _id: _id,
  }, 'DELETE')
};

export const like = (cardId) => {
  return api('cards/likes/' + cardId, null, 'PUT')
};

export const dislike = (cardId) => {
  return api('cards/likes/' + cardId, null, 'DELETE')
};
