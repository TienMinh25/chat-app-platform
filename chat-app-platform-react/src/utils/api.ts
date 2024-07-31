import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

let axiosInstance: AxiosInstance;

const createAxiosInstance = () => {
  axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3003/api/v1',
  });

  // Add interceptor to add header Authorization -> accessToken
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // Add interceptor when need to refresh token (access token expired)
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      // syntax to assertion attribute in object is non null or non undefined
      const originalRequestConfig = error.config!;
      const _refreshToken = localStorage.getItem('refreshToken');

      if (status !== 401) {
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post('/api/v1/refresh', null, {
          headers: {
            Authorization: `Bearer ${_refreshToken}`,
          },
        });

        const { accessToken = null, refreshToken = null } = response.data ?? {};

        if (!accessToken || !refreshToken) {
          throw new Error('Something went wrong while refreshing your token');
        }

        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      } catch (_error: unknown) {
        console.error(_error);
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        return Promise.reject(_error);
      }

      return axiosInstance(originalRequestConfig);
    },
  );
};

createAxiosInstance();

const callApi = async (endpoint: string, method: string, data?: any) => {
  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      data,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export default callApi;
