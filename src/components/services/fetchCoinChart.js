import axiosInstance from "../helper/axiosInstance";

export async function fetchCoinChart(id, vs_currency = 'usd', days = 365, interval = '') {
    try {
        const response = await axiosInstance.get(`/coins/${id}/market_chart`, {
            params: {
                vs_currency,
                days,
                interval
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch coin data: ${error.message}`);
    }
}
