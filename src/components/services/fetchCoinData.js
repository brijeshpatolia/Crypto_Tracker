import axiosInstance from "../helper/axiosInstance";

export async function fetchCoinData(coinId = 'usd' ,page =1) {
    const perPage = 10;
    try {
        const response = await axiosInstance.get(`/coins/markets?vs_currency=${coinId}&order=market_cap_desc&per_page=${perPage}&page=${page} `);
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch coin data: ${error.message}`);
        
    }
}