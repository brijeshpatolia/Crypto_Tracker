import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../components/services/fetchCoinDetails";
import { fetchCoinChart } from "../components/services/fetchCoinChart";
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';

function CoinDetailsPage() {
    const { coinid } = useParams();

    // Fetch coin details
    const { data: coinData, isLoading: isCoinLoading, isError: isCoinError, error: coinError } = useQuery(
        ['coinDetails', coinid],
        () => fetchCoinDetails(coinid),
        {
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 10,
        }
    );

    // Fetch chart data over the past 1 year (365 days)
    const { data: chartData, isLoading: isChartLoading, isError: isChartError, error: chartError } = useQuery(
        ['coinChart', coinid],
        () => fetchCoinChart(coinid, 'usd', 365), // Fetch data for the last 1 year
        {
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 10,
        }
    );

    if (isCoinLoading || isChartLoading) return <div>Loading...</div>;
    if (isCoinError) return <div>Error Fetching Coin Data: {coinError.message}</div>;
    if (isChartError) return <div>Error Fetching Chart Data: {chartError.message}</div>;

    // Prepare data for the chart
    const pricesData = chartData?.prices?.map(price => ({
        x: new Date(price[0]),
        y: price[1]
    })) || [];

    const chartDataConfig = {
        labels: pricesData.map(d => d.x),
        datasets: [{
            label: `${coinData.name} Price (USD)`,
            data: pricesData.map(d => d.y),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
        }]
    };

    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month' // You might want to group by months for a year span
                }
            },
            y: {
                beginAtZero: true,
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="p-5">
            <div className="text-center mb-5">
                <h1 className="text-4xl font-bold">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
                <img src={coinData.image.large} alt={`${coinData.name} logo`} className="mx-auto my-3" />
                <p>{coinData.description.en}</p>
            </div>

            {/* Add the Chart here */}
            <div className="mb-5">
                <h2 className="text-3xl font-semibold mb-3">Price Chart</h2>
                {pricesData.length > 0 ? (
                    <div className="h-96"> {/* Ensures a fixed height for the chart */}
                        <Line data={chartDataConfig} options={chartOptions} />
                    </div>
                ) : (
                    <p>No price data available</p>
                )}
            </div>

            {/* The rest of your component remains the same */}
            ...
        </div>
    );
}

export default CoinDetailsPage;
