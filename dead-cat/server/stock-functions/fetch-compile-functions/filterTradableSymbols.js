const technicalIndicators = require("../technical-Indicators/technicalIndicatorsMain");
const axios = require("axios");

async function filterTradableSymbols(arr1, arr2, compileCallback, dateObj) {
  console.log("FILTER TRADABLE STOCKS");

  let nyseHolderDown = []; //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
  let nyseHolderUp = []; //THESE ARRS NEED TO BE ACCESSIBLE TO COMPILE CALLBACK
  let nasdaqHolderDown = [];
  let nasdaqHolderUp = [];

  try {
    // ------ FETCH NYSE
    const dataNyse = await axios.get(
      "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
    );

    // ----- FILTER TRADABLE SYMBOLS ON NYSE THAT HAVE DROPPED
    for (let i = 0; i < dataNyse.data.length; i++) {
      if (
        dataNyse.data[i].changesPercentage < -5 &&
        arr1.indexOf(dataNyse.data[i].symbol) > -1 &&
        dataNyse.data[i].price > 0.1
      ) {
        nyseHolderDown.push(dataNyse.data[i]);
      }
    }

    for (let i = 0; i < dataNyse.data.length; i++) {
      if (
        dataNyse.data[i].changesPercentage > 5 &&
        arr1.indexOf(dataNyse.data[i].symbol) > -1 &&
        dataNyse.data[i].price > 0.1
      ) {
        nyseHolderUp.push(dataNyse.data[i]);
      }
    }
    // ------ FETCH NASDAQ
    const dataNas = await axios.get(
      "https://financialmodelingprep.com/api/v3/quotes/nasdaq?apikey=4d4593bc9e6bc106ee9d1cbd6400b218"
    );
    
  // ----- FILTER TRADABLE SYMBOLS ON NASDAQ THAT HAVE DROPPED
    for (let i = 0; i < dataNas.data.length; i++) {
      if (
        dataNas.data[i].changesPercentage < -5 &&
        arr2.indexOf(dataNas.data[i].symbol) > -1 &&
        dataNas.data[i].price > 0.1
      ) {
        nasdaqHolderDown.push(dataNas.data[i]);
      }
    }

    for (let i = 0; i < dataNas.data.length; i++) {
      if (
        dataNas.data[i].changesPercentage > 5 &&
        arr2.indexOf(dataNas.data[i].symbol) > -1 &&
        dataNas.data[i].price > 0.01
      ) {
        nasdaqHolderUp.push(dataNas.data[i]);
      }
    }
    //--------- CATCH
  } catch (e) {}
  const returnedData = await compileCallback(
    nasdaqHolderDown,
    nyseHolderDown,
    nyseHolderUp,
    nasdaqHolderUp,
    technicalIndicators.technicalIndicators,
    dateObj
  ); // CALLBACK FOR STOCK FILTER
  return returnedData;
}

module.exports = { filterTradableSymbols };
