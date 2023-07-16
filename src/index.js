import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const body = document.querySelector('body');
const select = body.querySelector('.breed-select');
const catInfo = body.querySelector('.cat-info');
const loader = body.querySelector('.loader');
const errorEl = body.querySelector('.error');

function breedSelect(breeds) {
  const selectItems = breeds.map(({ name, id }) => {
    return `<option value="${id}">${name}</option>`;
  });
  select.innerHTML = selectItems.join('');
}

window.addEventListener('load', event => {
  loader.classList.remove('hidden');
  select.classList.add('hidden');
  errorEl.classList.add('hidden');

  fetchBreeds()
    .then(breeds => {
      breedSelect(breeds);
      loader.classList.add('hidden');
      select.classList.remove('hidden');
    })
    .catch(error => {
      loader.classList.add('hidden');
      errorEl.classList.remove('hidden');
      console.log(error);
    });
});

select.addEventListener('change', event => {
  const breedId = event.target.value;

  catInfo.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchBreeds()
    .then(response => {
      const breeds = response;
      const breed = breeds.find(item => item.id === breedId);

      fetchCatByBreed(breedId)
        .then(data => {
          catInfo.innerHTML = `
            <img src="${data.url}" alt="Cat" width = "560">
            <h2>${breed.name}</h2>
            <p>${breed.description}</p>
            <p><b>Temperament:</b> ${breed.temperament}</p>
          `;
          loader.classList.add('hidden');
          catInfo.classList.remove('hidden');
        })
        .catch(error => {
          console.log(error);
          loader.classList.add('hidden');
          errorEl.classList.remove('hidden');
        });
    })
    .catch(error => {
      loader.classList.add('hidden');
      errorEl.classList.remove('hidden');
      console.log(error);
    });
});
