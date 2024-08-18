import axiosInstance from "../helper/axiosInstance";

export async function fetchCoinData(coinId) {
    try {
        const response = await axiosInstance.get(`/coins/markets?vs_currency=${coinId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch coin data: ${error.message}`);
        
    }
}