import axios from 'axios';
import qs from 'qs';

const APIService = axios.create({
  baseURL: 'https://phuong-kieu-tymex-test-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

APIService.interceptors.request.use(
  (request: any) => {
    if (!request.params) {
      request.params = {};
    }

    request.baseURL = 'https://phuong-kieu-tymex-test-production.up.railway.app';
    request.paramsSerializer = (params: any) => qs.stringify(params);

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
APIService.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default APIService;
