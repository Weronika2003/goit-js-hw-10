import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_2FIPZaRpSWrmrpVAqsIwO521FigPQDV9aCnYjgqyKwOsqKSixw4ZHl1WFD5gRceP';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        Authorization:
          'live_2FIPZaRpSWrmrpVAqsIwO521FigPQDV9aCnYjgqyKwOsqKSixw4ZHl1WFD5gRceP',
      },
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(error => {
      console.log(error);
      loader.classList.add('hidden');
      onError.classList.remove('hidden');
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      loader.classList.add('hidden');
      onError.classList.remove('hidden');
      throw error;
    });
}
