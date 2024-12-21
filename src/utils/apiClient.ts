import axios, { AxiosError } from 'axios';  
import { getToken, getRefreshToken, removeToken, setToken, isTokenExpired } from './jwt';  
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({  
    baseURL: 'https://e082-37-156-54-204.ngrok-free.app', 
});  


const refreshAccessToken = async () => {  
    const refreshToken = getRefreshToken();  
    if (!refreshToken) {  
        throw new Error('No refresh token found');  
    }  
    const response = await axios.post('https://e082-37-156-54-204.ngrok-free.app/v1/auth/refresh-token', { refreshToken }); 
    const newAccessToken = response.data.data; 
    removeToken(); 
    console.log("Refreshed")
    setToken(newAccessToken);  
    return newAccessToken;  
};  

apiClient.interceptors.request.use(  
  async (config) => {  
      console.log('Request Config:', config);  
      const token = getToken(); 
      if (typeof token === 'undefined') 
      {
        removeToken()
      }
      if (token) {  
          const isExpired = isTokenExpired(token);  
          if (isExpired) {  
              try {  
                  const newAccessToken = await refreshAccessToken();  
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`;  
              } catch (error) {  
                  console.error('Error refreshing token:', error);  
                  removeToken();  
                  throw error;
              }  
          } else {  
              config.headers['Authorization'] = `Bearer ${token}`;  
              console.log(config)
          }  
      }  
      return config;  
  },  
  (error) => {  
      return Promise.reject(error);  
  }  
);  

apiClient.interceptors.response.use(  
    (response) => {  
        return response;  
    },  
    async (error: AxiosError) => {  
        if (error.response?.status === 401) {  
             
            removeToken();  
        }  
        return Promise.reject(error);  
    }  
);  

export default apiClient;