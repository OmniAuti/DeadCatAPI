import { technicalIndicators } from "./technical-Indicators/technicalIndicatorsMain";

export async function filterTradableSymbols(arr1, arr2, compileCallback, dateObj) {
    let nyseHolderDown = []; //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
    let nyseHolderUp = []; //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
    let nasdaqHolderDown = [];
    let nasdaqHolderUp = [];
    
    try {
      // ------ FETCH NYSE
      const res = await fetch(
        "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
      );
      const dataNyse = await res.json();
      // ----- FILTER TRADABLE SYMBOLS ON NYSE THAT HAVE DROPPED
      for (let i = 0; i < dataNyse.length; i++) {
        if (
          dataNyse[i].changesPercentage < -5 &&
          arr1.indexOf(dataNyse[i].symbol) > 0 &&
          dataNyse[i].price > .10
        ) {
          nyseHolderDown.push(dataNyse[i]);
        }
      }
  
      for (let i = 0; i < dataNyse.length; i++) {
        if (
          dataNyse[i].changesPercentage > 5 &&
          arr1.indexOf(dataNyse[i].symbol) > 0 &&
          dataNyse[i].price > .10
        ) {
          nyseHolderUp.push(dataNyse[i]);
        }
      }
      // ------ FETCH NASDAQ
      const resTwo = await fetch(
        "https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
      );
      const dataNas = await resTwo.json();
      // ----- FILTER TRADABLE SYMBOLS ON NASDAQ THAT HAVE DROPPED
      for (let i = 0; i < dataNas.length; i++) {
        if (
          dataNas[i].changesPercentage < -5 &&
          arr2.indexOf(dataNas[i].symbol) > 0 &&
          dataNas[i].price > .10
        ) {
          nasdaqHolderDown.push(dataNas[i]);
        }
      }
  
      for (let i = 0; i < dataNas.length; i++) {
        if (
          dataNas[i].changesPercentage > 5 &&
          arr2.indexOf(dataNas[i].symbol) > 0 &&
          dataNas[i].price > .01
        ) {
          nasdaqHolderUp.push(dataNas[i]);
        }
      }
      //--------- CATCH
    } catch (e) {}
  
  
    const returnedData = await compileCallback( // THIS IS COMPILESTOCKS.JS
      nasdaqHolderDown,
      nyseHolderDown,
      nyseHolderUp,
      nasdaqHolderUp,
      technicalIndicators,
      dateObj
    ); // CALLBACK FOR STOCK FILTER
    return returnedData;
    
  }

  module.exports = {filterTradableSymbols}
