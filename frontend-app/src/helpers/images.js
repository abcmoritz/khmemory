import axios from 'axios';

const externalApiBaseURL = 'https://picsum.photos/v2/';
const maxRetries = 3;

export const loadImages = (retryCount = 0) => {
  const page = Math.floor(Math.random() * 200);
  const limit = 8;
  const url = `${externalApiBaseURL}list?page=${page}&limit=${limit}`;

  return axios
    .get(url)
    .then((response) => {
      if (response.data.length < 1) {
        if (retryCount < maxRetries) {
          return loadImages(retryCount + 1);
        } else {
          throw new Error('Maximum retries exceeded. No images found.');
        }
      }

      return response.data;
    })
    .catch((error) => {
      throw new Error(`Error loading images: ${error}`);
    });
};

export default loadImages