const form = document.querySelector('.search-form');
const submit = document.querySelector('button');
const KEY_USER = '22553588-f2f977a115121553e22566e7d';
const BASE_URL = 'https://pixabay.com/api/'
const axios = require('axios').default;
const gallery = document.querySelector('.gallery');
import Notiflix from 'notiflix';
import templateCard from './template/template-card.hbs'
form.addEventListener('submit', onSubmit);
const dateForTmpl = [];

function onSubmit(e) {
    e.preventDefault();
    let inputValue = e.currentTarget.elements.searchQuery.value;

    const url = `${BASE_URL}?key=${KEY_USER}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=10`;
    axios.get(url)
        .then(res => res.data)
        .then(res => {
            renderGalery(res.hits);
        })
        .catch(res => console.log(res));

}




function errorMessage(message) {
    Notiflix.Notify.info(message);
}

function renderGalery(t) {
    gallery.innerHTML = templateCard(t);

}