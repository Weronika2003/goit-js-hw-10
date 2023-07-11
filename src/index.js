import axios from "axios";

axios.defaults.headers.common['x-api-key'] =
    'live_2FIPZaRpSWrmrpVAqsIwO521FigPQDV9aCnYjgqyKwOsqKSixw4ZHl1WFD5gRceP';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const onError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const API_KEY = 'live_2FIPZaRpSWrmrpVAqsIwO521FigPQDV9aCnYjgqyKwOsqKSixw4ZHl1WFD5gRceP';
  
const MAIN_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
    })
}

export function fetchBreedsId(breedId) {
    return fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
    })
} 
