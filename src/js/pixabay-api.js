import { markup } from '/js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { iziOption } from '../main';

export function getImage(input) {
  const box = document.querySelector('.gallery');
  const API_KEY = '48883219-a8d6c51151168ef356226c6a1';
  const query = encodeURIComponent(input);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const URL = `https://pixabay.com/api/?${urlParams}`;

  return fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return markup(data);
    })
    .catch(error => {
      console.error(error);
      box.innerHTML = '';
      iziToast.show({
        ...iziOption,
        message: 'Sorry, an error happened. Try again!',
      });
      return;
    });
}
