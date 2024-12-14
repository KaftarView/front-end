import axios from 'axios'; 
import apiClient from '../../utils/apiClient'; 

export interface Categories {  
  categories : string[];
}  

const fetchCategories = async() => {  
  try {  
    const response = await apiClient.get('v1/public/categories', {  
        headers: {  
          "ngrok-skip-browser-warning": "69420",  
          'Content-Type': 'application/json',
        },  
      });  
    return response.data;   
  } catch (error) {  
    console.error('Error fetching user data:', error);  
    throw error;  
  }  
};  

export default fetchCategories;