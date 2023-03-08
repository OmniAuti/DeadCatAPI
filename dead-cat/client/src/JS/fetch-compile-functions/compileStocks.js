import { filterUpDownStocks } from "./filterUpDownStocks";

export async function compileStocks(arr1, arr2, arr3, arr4, callback, dateObj) {
    //---------------------- COMBINE AND SORT LARGEST DROP -------------------------
    let finalChartFatDown = []; // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
    let finalChartFatUp = []; // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
    let finalChart = []; // THIS HOLDS COMPILED AND SORTED STOCK TO GET TECHNICAL INDICATORS FROM AND MUTATE OBJECTS ! MOST IMPORTANT
    // ------- THIS IS A FILTER FOR WEIRD STOCK SYMBOLS THAT SLIP IN ----------
  
    let combinedStockDrop = [];
    combinedStockDrop = combinedStockDrop.concat(arr1, arr2);
  
    let combinedStockUp = [];
    combinedStockUp = combinedStockUp.concat(arr3, arr4);
  
    const keys = /^[A-Z]{1,5}$/g;
    finalChartFatDown = combinedStockDrop.filter((stock) => {
      return stock.symbol.match(keys);
    });
  
    finalChartFatUp = combinedStockUp.filter((stock) => {
      return stock.symbol.match(keys);
    });
  
    for (let i = 0; i < finalChartFatDown.length; i++) {
      finalChartFatDown.sort((a, b) => {
        return a.changesPercentage - b.changesPercentage;
      });
    }
  
    for (let i = 0; i < finalChartFatUp.length; i++) {
      finalChartFatUp.sort((a, b) => {
        return b.changesPercentage - a.changesPercentage;
      });
    }
    // MAKE SURE ARR HAS RIGHT LENGTH TO LOAD ------------
    const holderObjDown = {
      avgVolume: -1,
      bbLower: "-1",
      bbMiddle: "-1",
      bbPercent: "-1",
      bbUpper: "-1",
      cciTwenty: "-1",
      change: -1,
      changesPercentage: -1,
      dayHigh: -1,
      dayLow: -1,
      earningsAnnouncement: "-1",
      emaEight: "-1",
      emaFifty: "-1",
      emaTwelve: "-1",
      emaTwenty: "-1",
      emaTwentySix: "-1",
      emaTwoHun: "-1",
      eps: -1,
      exchange: "No Data",
      macd: "-1",
      macdHistogram: "-1",
      macdSignalLine: "-1",
      marketCap: -1,
      name: "Placeholder for lack of Symbols",
      open: -1,
      pe: -1,
      previousClose: -1,
      price: 1,
      priceAvg50: -1,
      priceAvg200: -1,
      rsi: "-1",
      sharesOutstanding: -1,
      smaFifty: "-1",
      smaFiveTeen: "-1",
      smaOneHun: "-1",
      smaThirty: "-1",
      smaTwenty: "-1",
      smaTwoHun: "-1",
      stochasticD: "-1",
      stochasticK: "-1",
      stochasticSignal: "-1",
      symbol: "No Data",
      timestamp: -1,
      volume: -1,
      vwap: "-1",
      vwmaFifty: "-1",
      vwmaFiveTeen: "-1",
      vwmaOneHun: "-1",
      vwmaThirty: "-1",
      vwmaTwenty: "-1",
      vwmaTwoHun: "-1",
      williamsR: "-1",
      wmaFifty: "-1",
      wmaFiveTeen: "-1",
      wmaOneHun: "-1",
      wmaThirty: "-1",
      wmaTwenty: "-1",
      wmaTwoHun: "-1",
      yearHigh: -1,
      yearLow: -1,
      yesterdayVolume: -1,
    };
    const holderObjUp = {
      avgVolume: 1,
      bbLower: "1",
      bbMiddle: "1",
      bbPercent: "1",
      bbUpper: "1",
      cciTwenty: "1",
      change: 1,
      changesPercentage: 1,
      dayHigh: 1,
      dayLow: 1,
      earningsAnnouncement: "1",
      emaEight: "1",
      emaFifty: "1",
      emaTwelve: "1",
      emaTwenty: "1",
      emaTwentySix: "1",
      emaTwoHun: "1",
      eps: 1,
      exchange: "No Data",
      macd: "1",
      macdHistogram: "1",
      macdSignalLine: "1",
      marketCap: 1,
      name: "Placeholder for lack of Symbols",
      open: 1,
      pe: 1,
      previousClose: 1,
      price: 1,
      priceAvg50: 1,
      priceAvg200: 1,
      rsi: "1",
      sharesOutstanding: 1,
      smaFifty: "1",
      smaFiveTeen: "1",
      smaOneHun: "1",
      smaThirty: "1",
      smaTwenty: "1",
      smaTwoHun: "1",
      stochasticD: "1",
      stochasticK: "1",
      stochasticSignal: "1",
      symbol: "No Data",
      timestamp: 1,
      volume: 1,
      vwap: "1",
      vwmaFifty: "1",
      vwmaFiveTeen: "1",
      vwmaOneHun: "1",
      vwmaThirty: "1",
      vwmaTwenty: "1",
      vwmaTwoHun: "1",
      williamsR: "1",
      wmaFifty: "1",
      wmaFiveTeen: "1",
      wmaOneHun: "1",
      wmaThirty: "1",
      wmaTwenty: "1",
      wmaTwoHun: "1",
      yearHigh: 1,
      yearLow: 1,
      yesterdayVolume: 1,
    };
  
    if (finalChartFatUp.length < 5) {
      while (finalChartFatUp.length < 5) {
        finalChartFatUp.push(holderObjUp);
      }
    }
    if (finalChartFatDown.length < 5) {
      while (finalChartFatDown.length < 5) {
        finalChartFatDown.push(holderObjDown);
      }
    }
    // SLIM CHAT DOWN SO IT'S NOT BLOATED
    let slimChartDown = 4;
    while (slimChartDown >= 0) {
      finalChart.unshift(finalChartFatDown[slimChartDown]);
      slimChartDown--;
    }
  
    let slimChartUp = 4;
    while (slimChartUp >= 0) {
      finalChart.unshift(finalChartFatUp[slimChartUp]);
      slimChartUp--;
    }
  
    const returnedData = await callback(finalChart, filterUpDownStocks, dateObj); // TECHNICALINDICATORS.JS
    return returnedData;
}
