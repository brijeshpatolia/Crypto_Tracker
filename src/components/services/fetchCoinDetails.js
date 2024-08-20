import axiosInstance from "../helper/axiosInstance";

export async function fetchCoinDetails(id) {
    
    try {
        const response = await axiosInstance.get(`/coins/${id} `);
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch coin data: ${error.message}`);
        
    }
}