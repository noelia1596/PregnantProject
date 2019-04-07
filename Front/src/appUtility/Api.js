import axios from 'axios';

export default axios.create({
  baseURL: `http://67.205.129.195/medifellows/api/public/api/v1/`
});

export const httpClient = axios.create({
  baseURL: 'http://159.89.235.6/rnapp/medifellow-apis/public'
});
