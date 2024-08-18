import { useQuery } from "react-query";
import { fetchCoinData } from "../services/fetchCoinData";
import { useEffect, useState } from "react";

function CoinTable ({currency}){

    const [page ,setpage] = useState(1);
    const {data,isLoading , isError , error} =  useQuery(['coins', currency, page], () => fetchCoinData(currency, page), {
      
        cacheTime: 1000 * 60 * 5 ,
        staleTime: 1000 * 60 * 10 ,

    });
   

    if(isLoading) return <div>Loading...</div>;
    if(isError){
        return <div>Error Fetching Data : {error.message}</div>;
    }
    return (
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
            <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
                {/* Header of the table */}
                <div className="basis-[35%]">
                    Coin 
                </div>
                <div  className="basis-[25%]">
                    Price 
                </div>
                <div  className="basis-[20%]">
                    24h change 
                </div>
                <div  className="basis-[20%]">
                    Market Cap
                </div>
            </div>

            <div className="flex flex-col w-[80vw] mx-auto">
                {isLoading && <div>Loading...</div>}
                {data && data.map((coin) => {
                    return (
                        <div onClick={() => handleCoinRedirect(coin.id)} key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between cursor-pointer">
                            <div className="flex items-center justify-start gap-3 basis-[35%]">

                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full" loading="lazy"/>
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
                    );
                })}
            </div>

            <div className="flex gap-4 justify-center items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setpage(page-1)} 
                    className="btn btn-primary btn-wide text-white text-2xl"
                >
                    Prev
                </button>
                <button 
                    onClick={() => setpage(page+1)} 
                    className="btn btn-secondary btn-wide text-white text-2xl"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CoinTable;