return fetch('https://nomoreparties.co/v1/plus-cohort-16/cards', {
  headers: {
    authorization: '24952460-73da-452d-95fc-2b05cf2309dc'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  GET https://nomoreparties.co/v1/plus-cohort-16/users/me
  authorization: '24952460-73da-452d-95fc-2b05cf2309dc'

  GET https://nomoreparties.co/v1/plus-cohort-16/cards
  authorization: '24952460-73da-452d-95fc-2b05cf2309dc'

  PATCH https://nomoreparties.co/v1/plus-cohort-16/users/me

  fetch('https://nomoreparties.co/v1/plus-cohort-16/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '24952460-73da-452d-95fc-2b05cf2309dc',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jacques Cousteau',
    about: 'Sailor, researcher'
  })
});

POST https://nomoreparties.co/v1/plus-cohort-16/cards