const buildIt = require("../fetch-compile-functions/buildIt")
const axios = require('axios').default;

const vwapFunction = require('./vwap')
const smaFunction = require('./sma')
const vwmaFunction = require('./vwma')
const wmaFunction = require('./wma')
const macdFunction = require('./macd')
const emaFunction = require('./ema')
const rsiFunction = require('./rsi')
const stochOsc1433Function = require('./stochOsc1433')
const williamsRFunction = require('./williams')
const cciFunction = require('./cci')
const bollingerBandsFunction = require('./bbands')
const setVolume = require('./volume')


// TA INTO OBJECTS FUNCTIONS ---------------------------------------------------------------------
async function technicalIndicators(finalArr, callback, dateObj) {
  console.log("TECHNICAL")
  let j = 0;

  while (j < finalArr.length) {
    // LOOP FOR TECHNICAL SYMBOL

    // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
    const { symbol } = finalArr[j];

    //THIS PULL IS FOR CLOSE PRICES TO CALC TAs PAST CLOSE DATA //
    const resSMA = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
    ).then(res => {return res})
    const dataSMA = resSMA.data; // SMA PULL USED FOR OTHER CALCS
    // ERROR CHECK FOR EMPTY PULL
    try {
      if (!Object.keys(dataSMA).length) {
        console.log("no SMA Pull data found");
      }
    } catch (e) {}

    //THIS PULL IS FOR OSCILLATORS ALL CURRENT CLOSE DATA
    const resOscPulled = await axios.get(
      `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
    ).then(res => {return res});
    const dataRecentPulled = await resOscPulled.data;
    // ERROR CHECK FOR EMPTY PULL
    try {
      if (!Object.keys(dataRecentPulled).length) {
        console.log("no Recent Pull data found");
      }
    } catch (e) {}

    // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
    const resVWAP = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
    ).then(res => {return res})
    const dataVWAP = await resVWAP.data;
    // ERROR CHECK FOR EMPTY PULL
    try {
      if (!Object.keys(dataVWAP).length) {
        console.log("no VWAP Pull data found");
      }
    } catch (e) {}

    // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
    vwapFunction.vwapFunction(finalArr, dataVWAP, j, dateObj);

    // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    smaFunction.smaFunction(finalArr, dataSMA, dataRecentPulled, j);

    // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    wmaFunction.wmaFunction(finalArr, dataSMA, dataRecentPulled, j);

    // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    vwmaFunction.vwmaFunction(finalArr, dataSMA, dataRecentPulled, j);

    // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------
    emaFunction.emaFunction(finalArr, dataSMA, dataRecentPulled, j, macdFunction.macdFunction);

    // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    rsiFunction.rsiFunction(finalArr, dataSMA, dataRecentPulled, j);

    // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    stochOsc1433Function.stochOsc1433Function(finalArr, dataSMA, dataRecentPulled, j); //DATA VWAP USED FOR RECETN CLOSE DATA

    // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    williamsRFunction.williamsRFunction(finalArr, dataSMA, dataRecentPulled, j);

    // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    cciFunction.cciFunction(finalArr, dataSMA, dataRecentPulled, j);

    // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    bollingerBandsFunction.bollingerBandsFunction(finalArr, dataSMA, dataRecentPulled, j);

    // SET VOLUME PROPERTIES
    setVolume.setVolume(finalArr, dataSMA, dataRecentPulled, j, dateObj);

    j++; // UPDATE WHILE LOOP
  } // THIS IS THE END OF LOOP
  const returnedData = await callback(finalArr, buildIt.buildIt);
  return returnedData;
}

module.exports = {technicalIndicators}