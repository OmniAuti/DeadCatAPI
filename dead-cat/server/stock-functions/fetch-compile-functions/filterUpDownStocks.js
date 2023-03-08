const buildIt = require('./buildIt')

async function filterUpDownStocks(finalArr, callback) {


  console.log('FILTER TUPDOWN')

    let stocksUp = [];
    let stocksDown = [];
  
    let j = 0;
  
    while (j < finalArr.length) {
      const { changesPercentage } = finalArr[j];
  
      if (changesPercentage > 0) {
        stocksUp.push(finalArr[j]);
      } else {
        stocksDown.push(finalArr[j]);
      }
  
      j++;
    } // END OF FILTER LOOP TO NEW UP/DOWN ARR
  
    // REASSIGN OBJECT NAMES FOR UP AND DOWN STOCKS
    for (let i = 0; i < stocksUp.length; i++) {
      // UPPER ------------------------------------------------------------------------------
      stocksUp[i].symbolUp = stocksUp[i].symbol;
      delete stocksUp[i].symbol;
      stocksUp[i].changeUp = stocksUp[i].change;
      delete stocksUp[i].change;
      stocksUp[i].avgVolumeUp = stocksUp[i].avgVolume;
      delete stocksUp[i].avgVolume;
      stocksUp[i].changesPercentageUp = stocksUp[i].changesPercentage;
      delete stocksUp[i].changesPercentage;
      stocksUp[i].emaEightUp = stocksUp[i].emaEight;
      delete stocksUp[i].emaEight;
      stocksUp[i].emaTwelveUp = stocksUp[i].emaTwelve;
      delete stocksUp[i].emaTwelve;
      stocksUp[i].emaTwentyUp = stocksUp[i].emaTwenty;
      delete stocksUp[i].emaTwenty;
      stocksUp[i].emaTwentySixUp = stocksUp[i].emaTwentySix;
      delete stocksUp[i].emaTwentySix;
      stocksUp[i].emaFiftyUp = stocksUp[i].emaFifty;
      delete stocksUp[i].emaFifty;
      stocksUp[i].emaTwoHunUp = stocksUp[i].emaTwoHun;
      delete stocksUp[i].emaTwoHun;
      stocksUp[i].macdUp = stocksUp[i].macd;
      delete stocksUp[i].macd;
      stocksUp[i].macdHistogramUp = stocksUp[i].macdHistogram;
      delete stocksUp[i].macdHistogram;
      stocksUp[i].macdSignalLineUp = stocksUp[i].macdSignalLine;
      delete stocksUp[i].macdSignalLine;
      stocksUp[i].priceUp = stocksUp[i].price;
      delete stocksUp[i].price;
      stocksUp[i].rsiUp = stocksUp[i].rsi;
      delete stocksUp[i].rsi;
      stocksUp[i].smaFiveTeenUp = stocksUp[i].smaFiveTeen;
      delete stocksUp[i].smaFiveTeen;
      stocksUp[i].smaTwentyUp = stocksUp[i].smaTwenty;
      delete stocksUp[i].smaTwenty;
      stocksUp[i].smaThirtyUp = stocksUp[i].smaThirty;
      delete stocksUp[i].smaThirty;
      stocksUp[i].smaFiftyUp = stocksUp[i].smaFifty;
      delete stocksUp[i].smaFifty;
      stocksUp[i].smaOneHunUp = stocksUp[i].smaOneHun;
      delete stocksUp[i].smaOneHun;
      stocksUp[i].smaTwoHunUp = stocksUp[i].smaTwoHun;
      delete stocksUp[i].smaTwoHun;
      stocksUp[i].volumeUp = stocksUp[i].volume;
      delete stocksUp[i].volume;
      stocksUp[i].volumeYesterdayUp = stocksUp[i].yesterdayVolume;
      delete stocksUp[i].yesterdayVolume;
      stocksUp[i].vwapUp = stocksUp[i].vwap;
      delete stocksUp[i].vwap;
      stocksUp[i].stochasticDUp = stocksUp[i].stochasticD;
      delete stocksUp[i].stochasticD;
      stocksUp[i].stochasticKUp = stocksUp[i].stochasticK;
      delete stocksUp[i].stochasticK;
      stocksUp[i].stochasticSignalUp = stocksUp[i].stochasticSignal;
      delete stocksUp[i].stochasticSignal;
      stocksUp[i].wmaFiveTeenUp = stocksUp[i].wmaFiveTeen;
      delete stocksUp[i].wmaFiveTeen;
      stocksUp[i].wmaTwentyUp = stocksUp[i].wmaTwenty;
      delete stocksUp[i].wmaTwenty;
      stocksUp[i].wmaThirtyUp = stocksUp[i].wmaThirty;
      delete stocksUp[i].wmaThirty;
      stocksUp[i].wmaFiftyUp = stocksUp[i].wmaFifty;
      delete stocksUp[i].wmaFifty;
      stocksUp[i].wmaOneHunUp = stocksUp[i].wmaOneHun;
      delete stocksUp[i].wmaOneHun;
      stocksUp[i].wmaTwoHunUp = stocksUp[i].wmaTwoHun;
      delete stocksUp[i].wmaTwoHun;
      stocksUp[i].vwmaFiveTeenUp = stocksUp[i].vwmaFiveTeen;
      delete stocksUp[i].vwmaFiveTeen;
      stocksUp[i].vwmaTwentyUp = stocksUp[i].vwmaTwenty;
      delete stocksUp[i].vwmaTwenty;
      stocksUp[i].vwmaThirtyUp = stocksUp[i].vwmaThirty;
      delete stocksUp[i].vwmaThirty;
      stocksUp[i].vwmaFiftyUp = stocksUp[i].vwmaFifty;
      delete stocksUp[i].vwmaFifty;
      stocksUp[i].vwmaOneHunUp = stocksUp[i].vwmaOneHun;
      delete stocksUp[i].vwmaOneHun;
      stocksUp[i].vwmaTwoHunUp = stocksUp[i].vwmaTwoHun;
      delete stocksUp[i].vwmaTwoHun;
      stocksUp[i].williamsRUp = stocksUp[i].williamsR;
      delete stocksUp[i].williamsR;
      stocksUp[i].cciUp = stocksUp[i].cciTwenty;
      delete stocksUp[i].cciTwenty;
      stocksUp[i].bbUpperUp = stocksUp[i].bbUpper;
      delete stocksUp[i].bbUpper;
      stocksUp[i].bbLowerUp = stocksUp[i].bbLower;
      delete stocksUp[i].bbLower;
      stocksUp[i].bbMiddleUp = stocksUp[i].bbMiddle;
      delete stocksUp[i].bbMiddle;
      stocksUp[i].bbPercentUp = stocksUp[i].bbPercent;
      delete stocksUp[i].bbPercent;
      // DOWNERS ------------------------------------------------------------------------------
      stocksDown[i].symbolDown = stocksDown[i].symbol;
      delete stocksDown[i].symbol;
      stocksDown[i].changeDown = stocksDown[i].change;
      delete stocksDown[i].change;
      stocksDown[i].avgVolumeDown = stocksDown[i].avgVolume;
      delete stocksDown[i].avgVolume;
      stocksDown[i].changesPercentageDown = stocksDown[i].changesPercentage;
      delete stocksDown[i].changesPercentage;
      stocksDown[i].emaEightDown = stocksDown[i].emaEight;
      delete stocksDown[i].emaEight;
      stocksDown[i].emaTwelveDown = stocksDown[i].emaTwelve;
      delete stocksDown[i].emaTwelve;
      stocksDown[i].emaTwentyDown = stocksDown[i].emaTwenty;
      delete stocksDown[i].emaTwenty;
      stocksDown[i].emaTwentySixDown = stocksDown[i].emaTwentySix;
      delete stocksDown[i].emaTwentySix;
      stocksDown[i].emaFiftyDown = stocksDown[i].emaFifty;
      delete stocksDown[i].emaFifty;
      stocksDown[i].emaTwoHunDown = stocksDown[i].emaTwoHun;
      delete stocksDown[i].emaTwoHun;
      stocksDown[i].macdDown = stocksDown[i].macd;
      delete stocksDown[i].macd;
      stocksDown[i].macdHistogramDown = stocksDown[i].macdHistogram;
      delete stocksDown[i].macdHistogram;
      stocksDown[i].macdSignalLineDown = stocksDown[i].macdSignalLine;
      delete stocksDown[i].macdSignalLine;
      stocksDown[i].priceDown = stocksDown[i].price;
      delete stocksDown[i].price;
      stocksDown[i].rsiDown = stocksDown[i].rsi;
      delete stocksDown[i].rsi;
      stocksDown[i].smaFiveTeenDown = stocksDown[i].smaFiveTeen;
      delete stocksDown[i].smaFiveTeen;
      stocksDown[i].smaTwentyDown = stocksDown[i].smaTwenty;
      delete stocksDown[i].smaTwenty;
      stocksDown[i].smaThirtyDown = stocksDown[i].smaThirty;
      delete stocksDown[i].smaThirty;
      stocksDown[i].smaFiftyDown = stocksDown[i].smaFifty;
      delete stocksDown[i].smaFifty;
      stocksDown[i].smaOneHunDown = stocksDown[i].smaOneHun;
      delete stocksDown[i].smaOneHun;
      stocksDown[i].smaTwoHunDown = stocksDown[i].smaTwoHun;
      delete stocksDown[i].smaTwoHun;
      stocksDown[i].volumeDown = stocksDown[i].volume;
      delete stocksDown[i].volume;
      stocksDown[i].volumeYesterdayDown = stocksDown[i].yesterdayVolume;
      delete stocksDown[i].yesterdayVolume;
      stocksDown[i].vwapDown = stocksDown[i].vwap;
      delete stocksDown[i].vwap;
      stocksDown[i].stochasticDDown = stocksDown[i].stochasticD;
      delete stocksDown[i].stochasticD;
      stocksDown[i].stochasticKDown = stocksDown[i].stochasticK;
      delete stocksDown[i].stochasticK;
      stocksDown[i].stochasticSignalDown = stocksDown[i].stochasticSignal;
      delete stocksDown[i].stochasticSignal;
      stocksDown[i].wmaFiveTeenDown = stocksDown[i].wmaFiveTeen;
      delete stocksDown[i].wmaFiveTeen;
      stocksDown[i].wmaTwentyDown = stocksDown[i].wmaTwenty;
      delete stocksDown[i].wmaTwenty;
      stocksDown[i].wmaThirtyDown = stocksDown[i].wmaThirty;
      delete stocksDown[i].wmaThirty;
      stocksDown[i].wmaFiftyDown = stocksDown[i].wmaFifty;
      delete stocksDown[i].wmaFifty;
      stocksDown[i].wmaOneHunDown = stocksDown[i].wmaOneHun;
      delete stocksDown[i].wmaOneHun;
      stocksDown[i].wmaTwoHunDown = stocksDown[i].wmaTwoHun;
      delete stocksDown[i].wmaTwoHun;
      stocksDown[i].vwmaFiveTeenDown = stocksDown[i].vwmaFiveTeen;
      delete stocksDown[i].vwmaFiveTeen;
      stocksDown[i].vwmaTwentyDown = stocksDown[i].vwmaTwenty;
      delete stocksDown[i].vwmaTwenty;
      stocksDown[i].vwmaThirtyDown = stocksDown[i].vwmaThirty;
      delete stocksDown[i].vwmaThirty;
      stocksDown[i].vwmaFiftyDown = stocksDown[i].vwmaFifty;
      delete stocksDown[i].vwmaFifty;
      stocksDown[i].vwmaOneHunDown = stocksDown[i].vwmaOneHun;
      delete stocksDown[i].vwmaOneHun;
      stocksDown[i].vwmaTwoHunDown = stocksDown[i].vwmaTwoHun;
      delete stocksDown[i].vwmaTwoHun;
      stocksDown[i].williamsRDown = stocksDown[i].williamsR;
      delete stocksDown[i].williamsR;
      stocksDown[i].cciDown = stocksDown[i].cciTwenty;
      delete stocksDown[i].cciTwenty;
      stocksDown[i].bbUpperDown = stocksDown[i].bbUpper;
      delete stocksDown[i].bbUpper;
      stocksDown[i].bbLowerDown = stocksDown[i].bbLower;
      delete stocksDown[i].bbLower;
      stocksDown[i].bbMiddleDown = stocksDown[i].bbMiddle;
      delete stocksDown[i].bbMiddle;
      stocksDown[i].bbPercentDown = stocksDown[i].bbPercent;
      delete stocksDown[i].bbPercent;
    }
    const returnedData = await callback(stocksUp, stocksDown);
    return returnedData;
  }

  module.exports = {filterUpDownStocks}