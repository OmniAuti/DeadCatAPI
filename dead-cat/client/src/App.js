import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer'
import {useEffect, useState} from 'react';

import { nasdaqMasterKey,nyseMasterKey } from './JS/masterKeys';

import { technicalAnalysis } from './JS/ApiFunction';
import { searchedSymbolTA } from './JS/handleSearchSymbol';
import {technicalPortfolioAnalysis} from './JS/APIPortfolioFunction';

function App() {
  const [pulledData, setPulledData] = useState([])
  const [searchedSymbol, setSearchedSymbol] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [searchedPulledData, setSearchedPulledData] = useState([])
  const [activePortfolio, setactivePortfolio] = useState([false])
  const [activePortfolioZ, setActivePortfolioZ] = useState([false])
  const [pullDone, setPullDone] = useState(false)
  const [portfolioPulledData, setPortfolioPulledData] = useState([])
  const [portfolioDefault, setPortfolioDefault] = useState(true)


  const changeDefaultOrPortfolio = (defaultPortfolioChange) => {
  localStorage.setItem('deadCatSettings', JSON.stringify(defaultPortfolioChange))
} 

// MAIN TOP 10 ---------------
useEffect(() => {
// EVEN THOUGH IT'S A STRING IT NEED TO BE PARSED TO WORK
  const savedSettings = JSON.parse(localStorage.getItem('deadCatSettings'))
  if (savedSettings === "default" || savedSettings === null) {
    technicalAnalysis().then(res => setPulledData(res))
    setPortfolioDefault(true)
    return
  } else if (savedSettings === 'portfolio') {
    // PULL STORED PORTFOLIO ----
    setTimeout(() => {
      const portfolioArr = JSON.parse(localStorage.getItem('deadCatPortfolio'))
      technicalPortfolioAnalysis(portfolioArr).then(res => setPortfolioPulledData(res))
      setPortfolioDefault(false)

    }, 10)
    return
  }

  console.log('failed default or portfolio Pull')
}, [])

// ----------------------------
const handleOpenPortfolio =() =>  {

if (activePortfolio === false) {
  setactivePortfolio(true)
  setTimeout(() => {
    setActivePortfolioZ(true)
  }, 500)
 return
}
  setactivePortfolio(false)
  setActivePortfolioZ(false)
}
const handleSearch = (symbol) => {
  // close it out check
  if (nasdaqMasterKey.indexOf(symbol) < 0 && nyseMasterKey.indexOf(symbol) < 0) {
    alert('This stock is not supported currently on Dead Cat')
    return
  }

    setactivePortfolio(!activePortfolio)
    setSearchedSymbol(symbol)
    setSearchActive(true)
    setPullDone(false)
    setTimeout(() => {
      setPullDone(true)
      setSearchActive(false)
    }, 1000);
}
// SEARCH API ---------------
useEffect(() => {
  if (searchActive) {
    searchedSymbolTA(searchedSymbol).then(res => setSearchedPulledData(res))
  } else {
    return;
  }
}, [searchActive])
// END SEARCH API ---------------
// MAKES SEARCH ACTIVE AFTER PULL IS DONE
useEffect(() => {
  if (!pulledData.length > 0) return;
  setPullDone(true)
}, [pulledData])

useEffect(() => {
  if (!portfolioPulledData.length > 0) return;
  setPullDone(true)
}, [portfolioPulledData])


  return (
      <div className="App">
          <Header pullDone={pullDone} handleOpenPortfolio={handleOpenPortfolio}  handleSearch={handleSearch}/>
          <MainContainer portfolioDefault={portfolioDefault} pullDone={pullDone} changeDefaultOrPortfolio={changeDefaultOrPortfolio} handleOpenPortfolio={handleOpenPortfolio} activePortfolioZ={activePortfolioZ} activePortfolio={activePortfolio} searchedSymbol={searchedSymbol} searchedPulledData={searchedPulledData} portfolioPulledData={portfolioPulledData} pulledData={pulledData}/>
      </div>
  
  );
}

export default App;
