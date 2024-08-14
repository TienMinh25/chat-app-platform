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

  let isRefreshing = false;
  let failedRequests: Array<any> = [];

  // Add interceptor when need to refresh token (access token expired)
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const status = error.response?.status;
      const originalRequestConfig = error.config!;
      const _refreshToken = localStorage.getItem('refreshToken');

      if (status !== 401) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then((token: any) => {
            originalRequestConfig.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequestConfig);
          })
          .catch((err: any) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await axiosInstance.post('auth/refresh', null, {
          headers: {
            Authorization: `Bearer ${_refreshToken}`,
          },
        });

        const { accessToken = null, refreshToken = null } = response.data ?? {};

        if (!accessToken || !refreshToken) {
          throw new Error('Something went wrong while refreshing your token');
        }

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        isRefreshing = false;
        failedRequests.forEach(({ resolve }: any) => resolve(accessToken));
        failedRequests = [];

        originalRequestConfig.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequestConfig);
      } catch (_error) {
        console.error(_error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        isRefreshing = false;

        failedRequests = [];

        window.location.href = '/login';

        return Promise.reject(_error);
      }
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
