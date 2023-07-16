const MAIN_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_2FIPZaRpSWrmrpVAqsIwO521FigPQDV9aCnYjgqyKwOsqKSixw4ZHl1WFD5gRceP';

function fetchBreeds() {
  const END_POINT = '/breeds';
  const PARAMS = new URLSearchParams({
    api_key: API_KEY,
  });
  return fetch(`${MAIN_URL}${END_POINT}?${PARAMS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';

  const PARAMS = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });
  return fetch(`${MAIN_URL}${END_POINT}?${PARAMS}`).then(response => {
    if (!response.ok) {
      throw new Error(resp.statusText);
    }
    return response.json();
  });
}
export { fetchBreeds, fetchCatByBreed };