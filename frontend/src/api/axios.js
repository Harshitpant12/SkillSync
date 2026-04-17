import axios from "axios"

let inMemoryAccessToken = null;

export const setAccessToken = (token) => {
    inMemoryAccessToken = token;
}

export const getAccessToken = () => {
    return inMemoryAccessToken;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

// request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response // if request succeeds just return response
    },
    async (error) => {
        const originalRequest = error.config

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    {withCredentials: true}
                )

                const newAccessToken = refreshResponse.data.accessToken;
                setAccessToken(newAccessToken);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (error) {
                setAccessToken(null); // the user is truly logged out

                window.location.href = '/login'; // will adjust it later according to actual router
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api