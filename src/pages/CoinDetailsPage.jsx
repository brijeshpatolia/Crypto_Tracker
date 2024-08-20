import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../components/services/fetchCoinDetails";

function CoinDetailsPage() {
    const { coinid } = useParams();

    const { data, isLoading, isError, error } = useQuery(['coinDetails', coinid], () => fetchCoinDetails(coinid), {
        cacheTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 10,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error Fetching Data: {error.message}</div>;

    return (
        <div className="p-5">
            <div className="text-center mb-5">
                <h1 className="text-4xl font-bold">{data.name} ({data.symbol.toUpperCase()})</h1>
                <img src={data.image.large} alt={`${data.name} logo`} className="mx-auto my-3" />
                <p>{data.description.en}</p>
            </div>

            <div className="mb-5">
                <h2 className="text-3xl font-semibold mb-3">Market Data</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Current Price (USD): ${data.market_data.current_price.usd}</div>
                    <div>Market Cap Rank: {data.market_cap_rank}</div>
                    <div>Market Cap (USD): ${data.market_data.market_cap.usd}</div>
                    <div>Total Volume (USD): ${data.market_data.total_volume.usd}</div>
                    <div>24h High: ${data.market_data.high_24h.usd}</div>
                    <div>24h Low: ${data.market_data.low_24h.usd}</div>
                    <div>Price Change 24h: ${data.market_data.price_change_24h}</div>
                    <div>Price Change Percentage 24h: {data.market_data.price_change_percentage_24h}%</div>
                </div>
            </div>

            <div className="mb-5">
                <h2 className="text-3xl font-semibold mb-3">Community Data</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Twitter Followers: {data.community_data.twitter_followers}</div>
                    <div>Reddit Subscribers: {data.community_data.reddit_subscribers}</div>
                </div>
            </div>

            <div className="mb-5">
                <h2 className="text-3xl font-semibold mb-3">Developer Data</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Forks: {data.developer_data.forks}</div>
                    <div>Stars: {data.developer_data.stars}</div>
                    <div>Subscribers: {data.developer_data.subscribers}</div>
                    <div>Total Issues: {data.developer_data.total_issues}</div>
                    <div>Closed Issues: {data.developer_data.closed_issues}</div>
                    <div>Pull Requests Merged: {data.developer_data.pull_requests_merged}</div>
                    <div>Pull Request Contributors: {data.developer_data.pull_request_contributors}</div>
                </div>
            </div>

            <div className="mb-5">
                <h2 className="text-3xl font-semibold mb-3">Links</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <a href={data.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                            Homepage
                        </a>
                    </div>
                    <div>
                        <a href={data.links.whitepaper} target="_blank" rel="noopener noreferrer">
                            Whitepaper
                        </a>
                    </div>
                    <div>
                        <a href={data.links.repos_url.github[0]} target="_blank" rel="noopener noreferrer">
                            GitHub Repository
                        </a>
                    </div>
                    <div>
                        <a href={data.links.reddit_subscribers} target="_blank" rel="noopener noreferrer">
                            Reddit
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoinDetailsPage;