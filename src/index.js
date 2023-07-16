import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const container = document.querySelector('.cat-info');


select.addEventListener('change', handlerClick);

function handlerClick(e) {
  const breeds = e.target.value;
  loader.hidden = false;
  select.hidden = true;
  container.hidden = true;

  fetchCatByBreed(breeds)
    .then(data => {
      container.innerHTML = markup(data);
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok'
      );
    })
    .finally(() => {
      loader.hidden = true;
      select.hidden = false;
      container.hidden = false;
    });
}

function options() {
  select.hidden = true;
  fetchBreeds()
    .then(data => {
      select.innerHTML = data
        .map(
          el => `
<option value="${el.id}">${el.name}</option>
`
        )
        .join('');
      new SlimSelect({
        select: '#selectCat',
        settings: {
          placeholderText: 'Select Cat',
        },
      });
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok'
      );
      error();
    })
    .finally(() => {
      error.hidden = true;
      loader.hidden = true;
      select.hidden = false;
    });
}
options();

function markup(array) {
  return array
    .map(({ url, breeds: [{ description, name, temperament }] }) => {
      return `<img src="${url}" alt="${name}" width="400"/>
    <h2 ">${name}</h2>
    <p>${description}</p>
    <h3>Temperament</h3>
    <p>${temperament}</p>`;
    })
    .join('');
}