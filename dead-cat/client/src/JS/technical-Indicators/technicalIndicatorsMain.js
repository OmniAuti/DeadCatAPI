import { buildIt } from "../fetch-compile-functions/buildIt";

import { vwapFunction } from "./vwap";
import { smaFunction } from "./sma";
import { wmaFunction } from "./wma";
import { vwmaFunction } from "./vwma";
import { macdFunction } from "./macd";
import { emaFunction } from "./ema";
import { rsiFunction } from "./rsi";
import { stochOsc1433Function } from "./stochOsc1433";
import { williamsRFunction } from "./williams";
import { cciFunction } from "./cci";
import { bollingerBandsFunction } from "./bbands";
import { setVolume } from "./volume";

// TA INTO OBJECTS FUNCTIONS ---------------------------------------------------------------------
export async function technicalIndicators(finalArr, callback, dateObj) {
  let j = 0;

  while (j < finalArr.length) {
    // LOOP FOR TECHNICAL SYMBOL

    // THIS IS THE ALL MIGHTY SYMBOL USED FOR PULLS
    const { symbol } = finalArr[j];

    //THIS PULL IS FOR CLOSE PRICES TO CALC TAs PAST CLOSE DATA //
    const resSMA = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
    );
    const dataSMA = await resSMA.json(); // SMA PULL USED FOR OTHER CALCS
    // ERROR CHECK FOR EMPTY PULL
    try {
      if (!Object.keys(dataSMA).length) {
        console.log("no SMA Pull data found");
      }
    } catch (e) {}

    //THIS PULL IS FOR OSCILLATORS ALL CURRENT CLOSE DATA
    const resOscPulled = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
    );
    const dataRecentPulled = await resOscPulled.json();
    // ERROR CHECK FOR EMPTY PULL
    try {
      if (!Object.keys(dataRecentPulled).length) {
        console.log("no Recent Pull data found");
      }
    } catch (e) {}

    // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
    const resVWAP = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=4d4593bc9e6bc106ee9d1cbd6400b218`
    );
    const dataVWAP = await resVWAP.json();
    // ERROR CHECK FOR EMPTY PULL
    try {
      if (!Object.keys(dataVWAP).length) {
        console.log("no VWAP Pull data found");
      }
    } catch (e) {}

    // VWAP ------------------------------------------------------------------------------------------------------------------------------------------------
    vwapFunction(finalArr, dataVWAP, j, dateObj);

    // SMA -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    smaFunction(finalArr, dataSMA, dataRecentPulled, j);

    // WMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    wmaFunction(finalArr, dataSMA, dataRecentPulled, j);

    // VWMA ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    vwmaFunction(finalArr, dataSMA, dataRecentPulled, j);

    // EMA WITH MACD CALLBACK ------------------------------------------------------------------------------------------------------------------------------------------
    emaFunction(finalArr, dataSMA, dataRecentPulled, j, macdFunction);

    // RSI ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    rsiFunction(finalArr, dataSMA, dataRecentPulled, j);

    // STOCHASTIC OSCILLATOR ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    stochOsc1433Function(finalArr, dataSMA, dataRecentPulled, j); //DATA VWAP USED FOR RECETN CLOSE DATA

    // WILLIAMS %R 14 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    williamsRFunction(finalArr, dataSMA, dataRecentPulled, j);

    // CCI 20 ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    cciFunction(finalArr, dataSMA, dataRecentPulled, j);

    // BOLLINGER BANDS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    bollingerBandsFunction(finalArr, dataSMA, dataRecentPulled, j);

    // SET VOLUME PROPERTIES
    setVolume(finalArr, dataSMA, dataRecentPulled, j, dateObj);

    j++; // UPDATE WHILE LOOP
  } // THIS IS THE END OF LOOP
  const returnedData = await callback(finalArr, buildIt);
  return returnedData;
}
