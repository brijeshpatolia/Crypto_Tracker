import { useState } from "react";
import Banner from "./components/Banner/Banner";
import CoinTable from "./components/CoinTable/CoinTable";
import Navabar from "./components/Navbar/Navbar";

function App(){
  const [currency ,setCurrency] = useState('inr');
  return(
    <>
      <Navabar setCurrency={setCurrency}/>
      <Banner/>
      <CoinTable currency={currency} />


    </>
  );
}

export default App;