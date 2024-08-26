import { useInfiniteQuery } from "react-query";
import { fetchCoinData } from "../services/fetchCoinData";
import { useRef, useEffect } from "react";
import store from "../../store/store";
import { useNavigate } from "react-router-dom";

function CoinTable() {
    const { currency } = store();
    const navigate = useNavigate();
    const observerRef = useRef();

    // Use useInfiniteQuery to handle pagination and infinite scrolling
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery(
        ['coins', currency],
        ({ pageParam = 1 }) => fetchCoinData(currency, pageParam),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length > 0) {
                    return pages.length + 1; // Load next page
                } else {
                    return undefined; // No more pages
                }
            },
        }
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasNextPage, fetchNextPage]);

    const handleCoinRedirect = (coinId) => {
        navigate(`/details/${coinId}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error Fetching Data: {error.message}</div>;

    return (
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
            <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
                {/* Header of the table */}
                <div className="basis-[35%]">
                    Coin
                </div>
                <div className="basis-[25%]">
                    Price
                </div>
                <div className="basis-[20%]">
                    24h change
                </div>
                <div className="basis-[20%]">
                    Market Cap
                </div>
            </div>

            <div className="flex flex-col w-[80vw] mx-auto">
                {data.pages.map((page) =>
                    page.map((coin) => (

                        <div
                            onClick={() => handleCoinRedirect(coin.id)}
                            key={coin.id}
                            className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center justify-start gap-3 basis-[35%]">
                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full" loading="lazy" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-3xl">{coin.name}</div>
                                    <div className="text-xl">{coin.symbol}</div>
                                </div>
                            </div>
                            <div className="basis-[25%]">
                                {coin.current_price}
                            </div>
                            <div className="basis-[20%]">
                                {coin.price_change_24h}
                            </div>
                            <div className="basis-[20%]">
                                {coin.market_cap}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isFetchingNextPage && <div>Loading more coins...</div>}

            <div ref={observerRef} className="h-1" />
        </div>
    );
}

export default CoinTable;
